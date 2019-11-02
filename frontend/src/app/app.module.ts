import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { overviewComponent } from './overview/overview.component';
import { MapComponent } from './map/map.component';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { AgmCoreModule } from '@agm/core';
import { Router } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    overviewComponent,
	MapComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
	  ChartsModule,
    CommonModule,
    TransferHttpCacheModule,
    HttpClientModule,
    NgtUniversalModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule,
	AgmCoreModule.forRoot({
		apiKey:'AIzaSyCY5Wr_yC_2lJwibQ_WGOB07YG5fEz1oMM'
	})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
