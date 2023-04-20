import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APIInterceptorService } from './services/api-interceptor.service';
import { HttpService } from './services/http.service';
import { SdgListComponent } from './sdg-list/sdg-list.component';
import { SdgCardComponent } from './sdg-card/sdg-card.component';
import { WebdocModule } from './webdoc/webdoc.module';
import { HomeComponent } from './home/home.component';
import {SingleVideoComponent} from './singleVideo/singleVideo.component'
import { ButtonComponent } from './button/button.component';
import { NavigationComponent } from './navigation/navigation.component';
import { IntroComponent } from './intro/intro.component';
import { ConclusionComponent } from './conclusion/conclusion.component';

@NgModule({
  declarations: [
    AppComponent,
    SdgListComponent,
    SdgCardComponent,
    HomeComponent,
    SingleVideoComponent,
    IntroComponent,
    ConclusionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    WebdocModule,
    NavigationComponent,
    ButtonComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptorService,
      multi: true,
    },
    HttpService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
