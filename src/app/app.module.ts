import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RegisterComponent } from './Account/register/register.component';
import { LoginComponent } from './Account/login/login.component';
import { AccountService } from './sharedServices/account.service';
import { NavComponent } from './Structure/nav/nav.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { ForbiddenComponent } from './error/forbidden/forbidden.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { IdleModalComponent } from './structure/idle-modal/idle-modal.component';
import { MomentModule } from 'angular2-moment';
import { AppService } from './sharedServices/app.service';
import { UploadDownloadComponent } from './upload-download/upload-download.component';
import { JsonPlaceholderComponent } from './json-placeholder/json-placeholder.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavComponent,
    ForbiddenComponent,
    IdleModalComponent,
    UploadDownloadComponent,
    JsonPlaceholderComponent
  ],
  imports: [
    MomentModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgIdleKeepaliveModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DepartmentModule,
    EmployeeModule,
    TableModule
  ],
  providers: [AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}