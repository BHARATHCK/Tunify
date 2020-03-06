import { Injectable } from "@angular/core";
import { tap, map } from "rxjs/operators";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return null;
    }

}