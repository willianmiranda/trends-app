import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { NgbTypeaheadConfig, NgbTypeaheadModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { LimitToPipe } from './shared/limit-to.pipe';
import { TrendsComponent } from './trends/trends.component';
import { YoutubeComponent } from './trends/youtube/youtube.component';

import { ContextService } from './shared/context.service';
import { YoutubeService } from './trends/youtube/youtube.service';
import { VideoListComponent } from './pages/video-list/video-list.component';
import { VideoComponent } from './pages/video/video.component';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LimitToPipe,
    TrendsComponent,
    YoutubeComponent,
    TrendsComponent,
    YoutubeComponent,
    VideoListComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbTypeaheadModule,
    NgbModule,
    MomentModule,
    AppRoutingModule
  ],
  providers: [
    NgbTypeaheadConfig,
    ContextService,
    YoutubeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
