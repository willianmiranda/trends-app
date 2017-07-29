import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoListComponent } from './pages/video-list/video-list.component';
import { VideoComponent } from './pages/video/video.component';

const appRoutes: Routes = [
  {
    path: 'video-list',
    component: VideoListComponent
  },
  {
    path: 'video/:videoId',
    component: VideoComponent
  },
  {
    path: '',
    redirectTo: '/video-list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule,
  ]
})

export class AppRoutingModule { }
