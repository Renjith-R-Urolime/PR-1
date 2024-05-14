import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request method is not GET, bypass caching
    if (req.method !== 'GET') {
      const sourcePage = req.headers.get('x-source-page');
      if (sourcePage) {
        this.deleteCacheKeys(sourcePage);
      }
      return next.handle(req);
    }

    const baseKey = req.urlWithParams;

    const isBinaryFile = this.isBinaryFile(req);
    const isJsonFile = this.isJsonFile(req);


    const appVersion = localStorage.getItem('appVersion');
    const scopeHeader = req.headers?.get('x-scope');
    const isAPIRequestCacheable = req.headers.get('x-cache') === 'true' ? true : false;

    let cacheKey = req.url;

    if (isJsonFile) {
      cacheKey = `${appVersion}_${req.url}`;
    }
    if (scopeHeader) {
      cacheKey = `${appVersion}_${scopeHeader}_${req.url}`;
    }

    const cachedResponse = sessionStorage.getItem(cacheKey);
    if (cachedResponse) {
      const response = new HttpResponse<any>({
        body: JSON.parse(cachedResponse),
        status: 200
      });
      return of(response);
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse && ( isJsonFile || isAPIRequestCacheable )) {
          sessionStorage.setItem(cacheKey, JSON.stringify(event.body));
        }
      })
    );
  }

  private isBinaryFile(req: HttpRequest<any>): boolean {
    const url = req.url.toLowerCase();
    return url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.endsWith('.svg') || url.endsWith('.js');
  }

  private isJsonFile(req: HttpRequest<any>): boolean {
    const url = req.url.toLowerCase();
    return url.endsWith('.json');
  }

  private deleteCacheKeys(sourcePage: string): void {
    const sourcePageWords = sourcePage.split('-');

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.includes(sourcePage) && sourcePageWords.some(word => key.includes(word))) {
        sessionStorage.removeItem(key);
      }
    }
  }
}
