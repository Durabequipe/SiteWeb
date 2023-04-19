import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SdgListComponent } from './sdg-list/sdg-list.component';
import { SingleVideoComponent } from './singleVideo/singleVideo.component';
import { PlayerComponent } from './webdoc/player/player.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'intro',
    component: SingleVideoComponent,
  },
  {
    path: 'sdg-list',
    component: SdgListComponent,
  },
  {
    path: 'webdoc/:id',
    component: PlayerComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
