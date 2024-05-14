import { Injectable } from "@angular/core";
import S3 from "aws-sdk/clients/s3";
import AWS, { CognitoIdentityCredentials } from "aws-sdk/global";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { environment } from "src/environments/environment";
import * as uuid from 'uuid';
/**
 * Service for handling file uploads, downloads, and deletions from Amazon S3.
 */
@Injectable({
  providedIn: "root",
})
export class S3UploadService {
  private s3: any; // Declare the s3 object
  /**
   * Constructor for S3UploadService.
   *
   * @param authService - The authentication service for obtaining user credentials.
   */
  constructor(private authService: AuthService) {
    // Retrieve the user access token from the authentication service
    const accessToken = this.authService.getToken();

    // Configure Cognito Identity Credentials with the obtained access token
    const cognitoIdentityCredentials = new CognitoIdentityCredentials(
      {
        IdentityPoolId: environment.cognitoIdentityPoolId,
        Logins: {
          [`cognito-idp.${environment.s3Region}.amazonaws.com/${environment.cognitoUserPoolId}`]:
            accessToken,
        },
      },
      { region: environment.s3Region }
    );

    // Update the AWS configuration with the configured credentials
    AWS.config.update({
      region: environment.s3Region,
      credentials: cognitoIdentityCredentials,
    });

    // Initialize the S3 client
    this.s3 = new S3({
      apiVersion: "2012-10-17",
    });
  }

  /**
   * Uploads a file to Amazon S3.
   *
   * @param file - The file to be uploaded.
   * @returns A Promise that resolves with the key of the uploaded file.
   */
  uploadFile(file: File): Promise<string> {
    const folderName =
      this.authService.getAccountIdFromHost() + "_infithra_assets";
    return new Promise<string>((resolve, reject) => {
      // Define the parameters for the S3 putObject operation
      const params: S3.PutObjectRequest = {
        Bucket: environment.s3Bucket,
        Key: `${folderName}/${uuid.v4()}.${file.type.split('/')[1]}`,
        Body: file,
        ContentDisposition : 'inline',
        ContentType: file.type,
        CacheControl: 'max-age=86400'
      };

      // Initiate the S3 putObject operation
      this.s3.upload(params, (err, data) => {
        if (err) {
          // Reject the Promise if an error occurs during the S3 putObject operation
          console.error("Error uploading file:", err);
          reject(err);
        } else {
          // Resolve the Promise with the key of the uploaded file

          resolve(data.key);
        }
      });
    });
  }

  /**
   * Retrieves a file from Amazon S3 and converts its contents to a base64-encoded string.
   *
   * @param key - The key of the file in the S3 bucket.
   * @returns A Promise that resolves with the base64-encoded string representing the file.
   */
  getFile(key: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // Define the parameters for the S3 getObject operation
      const params: S3.GetObjectRequest = {
        Bucket: environment.s3Bucket,
        Key: key,
      };

      // Initiate the S3 getObject operation
      this.s3.getObject(params, (err, data) => {
        if (err) {
          // Reject the Promise if an error occurs during the S3 getObject operation
          reject(err);
        } else {
            // Convert the ArrayBuffer to a base64-encoded string
            const base64Data = this.encode(data.Body);

            // Extract additional information from the S3 response
            const fileInfo = {
              name: key,
              base64Data: `data:${key.split('.')[1] !== 'pdf' ? 'image' : 'application'}/${key.split('.')[1]};base64,` + base64Data,
              buffer: data.Body.buffer,
              size: data.ContentLength,
              type: key.split('.')[1],
              lastModified: data.LastModified,
            };

            // Resolve the Promise with the fileInfo object
            resolve(fileInfo);

            // Note: The 'data.Body' is an ArrayBuffer, which is converted to base64 using 'this.encode()'
            // It is converted to base64 to be used as a data URI in the context of an image.
        }
      });
    });
  }

  /**
   * Deletes a file from Amazon S3.
   *
   * @param key - The key of the file in the S3 bucket.
   * @returns A Promise that resolves when the file is successfully deleted.
   */
  deleteFile(key: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Define the parameters for the S3 deleteObject operation
      const params: S3.DeleteObjectRequest = {
        Bucket: environment.s3Bucket,
        Key: key,
      };

      // Initiate the S3 deleteObject operation
      this.s3.deleteObject(params, (err, data) => {
        if (err) {
          // Reject the Promise if an error occurs during the S3 deleteObject operation
          reject(err);
        } else {
          // Resolve the Promise when the file is successfully deleted
          resolve();
        }
      });
    });
  }

  /**
   * Encodes an ArrayBuffer to a base64-encoded string.
   *
   * @param data - The ArrayBuffer to be encoded.
   * @returns The base64-encoded string.
   */
  private encode(data): string {
    // Convert the ArrayBuffer to a base64-encoded string
    var str = data.reduce(function (a, b) {
      return a + String.fromCharCode(b);
    }, "");
    return btoa(str).replace(/.{76}(?=.)/g, "$&\n");
  }

    /**
   * Generates a pre-signed URL for the specified S3 object.
   *
   * @param key - The key of the file in the S3 bucket.
   * @returns A Promise that resolves with the pre-signed URL.
   */
    generatePreSignedURL(key: string): Promise<string> {
      const params: any = {
        Bucket: environment.s3Bucket,
        Key: key,
        Expires: 60 * 60, // Set the expiration time in seconds
      };

      return new Promise<string>((resolve, reject) => {
        this.s3.getSignedUrl('getObject', params, (err, url) => {
          if (err) {
            reject(err);
          } else {
            resolve(url);
          }
        });
      });
    }
}
