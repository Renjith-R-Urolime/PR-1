/* eslint-disable no-unused-vars */
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CookieStorage } from 'amazon-cognito-identity-js';
import AWS, { CognitoIdentityCredentials } from 'aws-sdk/global';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  isLoggedIn = false;
  private helper = new JwtHelperService();
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  sessionUserAttributes: any;
  // public fields
  userEmail: any;
  verified:any;
  user:any;
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  private cookieStorage = environment.live ? { domain: `.${environment.appUrl}` } : {};
  poolData = {
    UserPoolId: environment.cognitoUserPoolId,
    ClientId: environment.cognitoAppClientId,
    Storage: new CookieStorage(this.cookieStorage) // Subdomains are included
  };
  userPool = new CognitoUserPool(this.poolData);

  cognitoUser = this.userPool.getCurrentUser();
  email: any;

  constructor(
    private router: Router,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }
  getUserAttributes() {
    return new Promise((resolve, reject) => {
      let currentUser = this.getCognitoUser();

      currentUser?.getUserAttributes((err, attributes) => {
        if (err) {
          reject(err); // Reject the promise with the error
        } else {
          resolve(attributes); // Resolve the promise with the attributes
        }
      });
    });
  }


  login(email: string, password: string, mfaType?: string, otp?, remeberDevice?, newPassword?): Observable<any> {
    this.isLoadingSubject.next(true);
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: this.userPool,
      Storage: new CookieStorage(this.cookieStorage) // Subdomains are included
    };

    const cognitoUser = new CognitoUser(userData);

    //cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
    cognitoUser.setAuthenticationFlowType('USER_SRP_AUTH');

    return new Observable((observer) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result: any) => {

          if (remeberDevice) {
            cognitoUser.setDeviceStatusRemembered({
              onSuccess: () => {
                observer.next({ status: true })
                observer.complete();
                //resolve(result);
              },
              onFailure: function (err) {

                observer.error(false);
              },
            });
          }
          else {
            const accountIds = this.getAccountId(result)

            const cognitoIdentityCredentials = new CognitoIdentityCredentials({
              IdentityPoolId: environment.cognitoIdentityPoolId,
              Logins: {
                [`cognito-idp.${environment.s3Region}.amazonaws.com/${environment.cognitoUserPoolId}`]: result.getIdToken().getJwtToken()
              }
            }, { region: environment.s3Region });

            // AWS.config.credentials = cognitoIdentityCredentials;

            // Add the User's Id Token to the Cognito credentials login map.
            (<AWS.CognitoIdentityCredentials>cognitoIdentityCredentials).get((error) => {
              if (error) {
                console.error(error)
              }
            })
            // const accessTokenPayload = session.getAccessToken().payload;
            // const userEmail = accessTokenPayload.email;




            if (accountIds !== null) {
              observer.next({ status: true, accountIds: accountIds });
              observer.complete();
            } else {
              observer.next({ status: false });
            }

          }

          this.isLoggedIn = true;

        },
        onFailure: (err) => {

          observer.error(false);
        },
        /*  mfaSetup: function(challengeName, challengeParameters) {
           cognitoUser.associateSoftwareToken(this);
         },
         selectMFAType: function(challengeName, challengeParameters) {
           var mfaType = prompt('Please select the MFA method.', ''); // valid values for mfaType is "SMS_MFA", "SOFTWARE_TOKEN_MFA"
           cognitoUser.sendMFASelectionAnswer(mfaType, this);
         }, */
        selectMFAType: function (challengeName, challengeParameters) {
          // valid values for mfaType is "SMS_MFA", "SOFTWARE_TOKEN_MFA"
          cognitoUser.sendMFASelectionAnswer(mfaType, this);

        },
        totpRequired: function (secretCode, params) {
          //var challengeAnswer = prompt('Please input the TOTP code.', '');
          if (secretCode && otp) {
            cognitoUser.sendMFACode(otp, this, 'SOFTWARE_TOKEN_MFA');
          }
          else {
            observer.next({ status: false, type: 'totpRequired' });
            observer.complete();
          }

        },
        /*  mfaRequired: function(codeDeliveryDetails) {
           var verificationCode = prompt('Please input verification code', '');
           cognitoUser.sendMFACode(verificationCode, this);
         }, */

        newPasswordRequired: function (userAttributes, requiredAttributes) {
          // User was signed up by an admin and must provide new
          // new page this open for change password
          if (newPassword) {
            cognitoUser.completeNewPasswordChallenge(newPassword, {}, {
              onSuccess: result => {

                observer.next({ status: true })
                observer.complete();
              },
              onFailure: err => {
                observer.error(err);
              }
            });
          }
          else {
            observer.next({ status: false, type: 'newPasswordRequired' });
            observer.complete();
          }

        }
      });
    }).pipe(
      finalize(() => {
        this.isLoadingSubject.next(false);
      })
    );
  }

  logout() {
    localStorage.setItem("isLoggedIn", 'false');
    localStorage.removeItem('sessionData');
    let userPool = new CognitoUserPool(this.poolData);
    let cognitoUser = userPool.getCurrentUser();
    cognitoUser?.signOut();

    this.clearUserCache()

    this.router.navigate(["/auth/login"])
  }

  getCognitoUser() {
    let userPool = new CognitoUserPool(this.poolData);
    let currentUser = userPool.getCurrentUser();
    currentUser?.getSession((err: any, session: any) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
      }
    });
    return currentUser;
  }

  forgotPassword(email: string): Observable<any> {
    this.isLoadingSubject.next(true);
    const userData = {
      Username: email,
      Pool: this.userPool,
      Storage: new CookieStorage(this.cookieStorage) // Subdomains are included
    };
    const cognitoUser = new CognitoUser(userData);

    return new Observable((observer) => {
      cognitoUser.forgotPassword({
        onSuccess: function (data) {
          // Successfully initiated reset password request

          observer.next({ status: true }) // Emit the success data
          observer.complete(); // Complete the Observable
        },
        onFailure: function (err) {
          // Handle the error
          alert(err.message || JSON.stringify(err));
          observer.error(err); // Emit the error data
          observer.complete(); // Complete the Observable
        }
      });
    }).pipe(
      finalize(() => {
        // This block will run when the Observable completes (successfully or with an error)
        this.isLoadingSubject.next(false);
      })
    );
  }
  resetPassword(email: string, newPassword: string, verificationCode): Observable<any> {
    this.isLoadingSubject.next(true);
    const userData = {
      Username: email,
      Pool: this.userPool,
      Storage: new CookieStorage(this.cookieStorage) // Subdomains are included
    };
    const cognitoUser = new CognitoUser(userData);
    return new Observable((observer) => {
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess() {

          observer.next({ status: true }); // Emit the success data
          observer.complete();
        },
        onFailure(err) {

          observer.error(err); // Emit the error data
          observer.complete();
        },
      });
    }).pipe(
      finalize(() => {
        // This block will run when the Observable completes (successfully or with an error)
        this.isLoadingSubject.next(false);
      })
    );
    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess() {

      },
      onFailure(err) {
        console.error('Password not confirmed!',err);
      },
    });
  }

  // need create new user then login
  // registration(user: UserModel): Observable<any> {
  //   this.isLoadingSubject.next(true);
  //   return this.authHttpService.createUser(user).pipe(
  //     map(() => {
  //       this.isLoadingSubject.next(false);
  //     }),
  //     switchMap(() => this.login(user.email, user.password)),
  //     catchError((err) => {
  //       console.error('err', err);
  //       return of(undefined);
  //     }),
  //     finalize(() => this.isLoadingSubject.next(false))
  //   );
  // }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  isloggedIn(): boolean {
    var isAuth = false;
    const userPool = new CognitoUserPool(this.poolData);
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser !== null) {
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
        }
        //const authData = JSON.parse(session);

        // Check Token Validity
        const isTokenExpired = this.helper.isTokenExpired(session?.accessToken.jwtToken)
        if (session.isValid() && !isTokenExpired) {
          isAuth = true;
        }
        else {
          this.clearUserCache()
        }
      })
    }

    return isAuth;
  }

  verifyMFA(code) {
    let currentUser: any = this.getCognitoUser();
    return new Promise((resolve, reject) => {
      currentUser.verifySoftwareToken(
        code,
        "My TOTP device",
        {
          onFailure: (err) => {
            reject(err);
          },
          onSuccess: (result) => {
            resolve(result);
          },
        }
      );
    });
  }
  async enableDisableMFA(val) {
    const totpMfaSettings = {
      PreferredMfa: false,
      Enabled: val,
    };
    let currentUser: any = this.getCognitoUser();
    return new Promise((resolve, reject) => {
      currentUser.setUserMfaPreference(
        totpMfaSettings,
        totpMfaSettings,
        function (err, result) {
          if (err) {
            alert(err.message || JSON.stringify(err));
            reject(err);
          }
          resolve(result);
        }
      );
    });


  }



  async setupMFA() {
    let currentUser: any = this.getCognitoUser();
    return new Promise((resolve, reject) => {
      currentUser.associateSoftwareToken({
        onFailure: (error) => {
          reject(error); // Reject the promise with the error
        },
        associateSecretCode: (code) => {
          // const url = `otpauth://totp/${currentUser.username}?secret=${code}&issuer=Cognito-TOTP-MFA`;


          resolve(code); // Resolve the promise with the generated URL
        }
      });
    });
  }

  async userData() {
    let currentUser = this.getCognitoUser();
    return new Promise((resolve, reject) => {
      currentUser.getUserData((err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(data);
      }, { bypassCache: true });
    });


  }

  async trustDevice() {

    let currentUser = this.getCognitoUser();
    return new Promise((resolve, reject) => {
      currentUser.setDeviceStatusRemembered({
        onSuccess: function (result) {
          resolve(result);
        },
        onFailure: function (err) {
          reject(err);
        },
      });
    });
  }

  async currentDevice() {
    let currentUser = this.getCognitoUser();
    currentUser.getCachedDeviceKeyAndPassword();
    return new Promise((resolve, reject) => {
      currentUser.getDevice({
        onSuccess: function (result) {

        },
        onFailure: function (err) {
          alert(err.message || JSON.stringify(err));
        },
      });
      currentUser.listDevices(10, null, {
        onSuccess: function (result) {

        },
        onFailure: function (err) {
          alert(err.message);
        },
      });

    });
  }

  getToken() {
    return this.getCognitoUser().getSignInUserSession().getIdToken().getJwtToken()
  }

  cognitoGroups: string[] = [];

  getGroupIds(authData: any) {
    this.cognitoGroups = authData.idToken.payload['cognito:groups'];
  }

  getAccountId(authData) {
    if (authData.accessToken.payload['cognito:groups'].length > 0) {
      return authData.accessToken.payload['cognito:groups']
    }
    return null;
  }

  getAccountIdFromHost() {
    const hostname = location.host;

    if (hostname.endsWith("." + environment.appUrl)) {
      const accountId = hostname.slice(0, -environment.appUrl.length - 1);
      if (/^\d{7}$/.test(accountId)) {
        return accountId;
      }
    }

    return null;
  }
  clearUserCache() {
    // Clear cookies using CookieStorage
    const cookieStorage = new CookieStorage(this.cookieStorage) // Subdomains are included
    cookieStorage.clear();

    // Optionally, clear local storage
    localStorage.clear();
  }
}
