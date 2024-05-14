import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, finalize, take } from "rxjs";
import { AuthService } from "src/app/modules/auth";
import { environment } from "src/environments/environment";
import { ApiErrorService } from "./api-error.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  baseUrl: string;
  authorizationOptions: any;
  private isProcessingSubject = new BehaviorSubject<boolean>(false);
  public $isProcessing = this.isProcessingSubject.asObservable();
  currentRoute: string = "";
  constructor(
    private http: HttpClient,
    public apiError: ApiErrorService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authorizationOptions = {
      headers: new HttpHeaders({
        'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        // 'Content-Type': 'application/json',
        'Pragma': 'no-cache',
        'Expires': '0'
      })
    };
  }
  getPdfData(url) {
    this.baseUrl = this.getBaseUrl(url);
    this.authorizationOptions.headers = this.authorizationOptions.headers
    .delete("x-scope")
    .delete("x-source-page");

    return this.http.get(`${this.baseUrl}/${url}`, {
        ...this.authorizationOptions,
        responseType: "blob"
      })
      .pipe(catchError((err) => this.apiError.handleError(err, url)));
  }

  get(url: string, headerVal?) {
    this.baseUrl = this.getBaseUrl(url);
    this.authorizationOptions.headers = this.authorizationOptions.headers
      .delete("x-scope")
      .delete("x-cache")
      .delete("x-source-page");

    if (headerVal) {
      this.authorizationOptions.headers = this.authorizationOptions.headers.append("x-scope", headerVal);
    }
    this.authorizationOptions.headers = this.authorizationOptions.headers.append("x-cache",  this.applyRequestCaching(url));


    return this.http
      .get(`${this.baseUrl}/${url}`, this.authorizationOptions)
      .pipe(
        take(1),
        catchError((err) => this.apiError.handleError(err, url))
      );
  }

  post(url: string, data?: any, currentSource?: string) {
    // Minify the JSON string
    const minifiedPayload = data || JSON.stringify(data);

    this.baseUrl = this.getBaseUrl(url);
    this.authorizationOptions.headers = this.authorizationOptions.headers
      .delete("x-scope")
      .delete("x-cache")
      .delete("x-source-page");

    if (currentSource) {
      this.authorizationOptions.headers = this.authorizationOptions.headers.append( "x-source-page", currentSource );
    }else{
      this.authorizationOptions.headers = this.authorizationOptions.headers.append( "x-source-page", this.getSourcePage(url, 'POST') );
    }

    return this.http
      .post(
        `${this.baseUrl}/${url}`,
        minifiedPayload,
        this.authorizationOptions
      )
      .pipe(
        catchError((err) => this.apiError.handleError(err,url)),
        finalize(() => {
          this.isProcessingSubject.next(false);
      }));
  }

  delete(url: string, currentSource?: string) {
    this.baseUrl = this.getBaseUrl(url);
    this.authorizationOptions.headers = this.authorizationOptions.headers
      .delete("x-scope")
      .delete("x-cache")
      .delete("x-source-page");
    if (currentSource) {
      this.authorizationOptions.headers = this.authorizationOptions.headers.append( "x-source-page", currentSource );
    }else{
      this.authorizationOptions.headers = this.authorizationOptions.headers.append( "x-source-page", this.getSourcePage(url, 'DELETE') );
    }
    return this.http
      .delete(`${this.baseUrl}/${url}`, this.authorizationOptions)
      .pipe(catchError((err) => this.apiError.handleError(err, url)));
  }

  put(url: string, data?: any, currentSource?: string) {
    this.isProcessingSubject.next(true);
    this.baseUrl = this.getBaseUrl(url);
    this.authorizationOptions.headers = this.authorizationOptions.headers
      .delete("x-scope")
      .delete("x-cache")
      .delete("x-source-page");
    if (currentSource) {
      this.authorizationOptions.headers = this.authorizationOptions.headers.append( "x-source-page", currentSource );
    }else{
      this.authorizationOptions.headers = this.authorizationOptions.headers.append( "x-source-page", this.getSourcePage(url, 'PUT') );
    }

    return this.http
      .put(`${this.baseUrl}/${url}`, data, this.authorizationOptions)
      .pipe(
        catchError((err) => this.apiError.handleError(err, url)),
        finalize(() => {
          this.isProcessingSubject.next(false);
      }));
  }

  private getSourcePage(url: string, method: string) {
    const urlSplit = url.split('/');
    if( method === "POST" ) {
      return urlSplit[urlSplit.length - 1]
    }else{
      return urlSplit[urlSplit.length - 2]
    }
  }

  async setSource() {
    const currentSource = await this.getSource();

    this.authorizationOptions.headers =
      this.authorizationOptions.headers.append("x-source-page", currentSource);
  }
  resetSourceScope() {
    this.authorizationOptions.headers =
      this.authorizationOptions.headers.delete("x-scope");
    this.authorizationOptions.headers =
      this.authorizationOptions.headers.delete("x-source-page");
  }
  setScope(val) {
    this.authorizationOptions.headers =
      this.authorizationOptions.headers.append("x-scope", val);
  }
  getSource() {
    const urlSegments = this.router.url
      .split("/")
      .map((segment) => segment.toLowerCase());
    let currentPage = "";

    if (urlSegments.includes("create") || urlSegments.includes("edit")) {
      const createIndex = urlSegments.indexOf("create");
      const editIndex = urlSegments.indexOf("edit");


      if (createIndex !== -1 || editIndex !== -1) {
        if (createIndex !== -1) {
          // "create" is in the URL, get the segment before it
          currentPage = urlSegments[createIndex - 1];
        } else if (editIndex !== -1) {
          // "edit" is in the URL, get the segment before it
          currentPage = urlSegments[editIndex - 1];

        }
      }
    }
    return currentPage;
  }

  applyRequestCaching(url: string): string {
    const lastSegment = url.split("/").pop()?.toLowerCase();

    return environment.enableCaching ? isNaN(parseInt(lastSegment!)) === true || url.includes('.json') ? 'true' : 'false' : 'false';
  }

  getBaseUrl(url) {
    if (environment.live) {
      return environment.apiUrl;
    } else {
      const portMap = {
        5301: ["core-hr", "payroll"],
        5302: ["leave", "time-attendance"],
        5303: ["setup", "tabs", "resources", "dropdown", "company", "accounts", "reports", "fileupload","dashboard"],
      };
      const port = Object.keys(portMap).find((key) =>
        portMap[key].some((item) => item === url.split("/")[0])
      );
      if (port) {
        return environment.apiUrl + `:${port}`;
      }
    }
  }
}