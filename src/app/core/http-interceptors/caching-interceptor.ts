import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheMapService } from '../services';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
    constructor(
        private cacheMapService: CacheMapService
    ) {

    }
    intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
        if(!this.isRequestCachable) {
            return next.handle(req)
        }
        const cachedResponse = this.cacheMapService.get(req);
        if(cachedResponse!==null) {
            return of(cachedResponse)
        }
        return next.handle(req).pipe(
            tap(event => {
                if(event instanceof HttpResponse) {
                    this.cacheMapService.put(req, event)
                }
            })
        );
    }
    private isRequestCachable(req:HttpRequest<any>) {
        return (req.method === 'GET')
    }
}