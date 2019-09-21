import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Cache, CacheMapService } from './services';
import { CachingInterceptor } from './http-interceptors';

@NgModule({
    imports:[
        HttpClientModule
    ],
    providers:[
        CacheMapService,
        {
            provide:Cache,
            useClass:CacheMapService
        },
        {
            provide:HTTP_INTERCEPTORS,
            useClass:CachingInterceptor,
            multi:true
        }
    ]
})

export class CoreModule {
    constructor(
        @Optional() @SkipSelf() coreModule: CoreModule
    ) {
        if(coreModule) {
            throw new Error('Coremodule is already loaded. Import only in AppModule.')
        }
    }
}
