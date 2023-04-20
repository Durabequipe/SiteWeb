import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConclusionComponent } from './conclusion/conclusion.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { SdgListComponent } from './sdg-list/sdg-list.component';
import { PlayerComponent } from './webdoc/player/player.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'intro',
    component: IntroComponent,
  },
  {
    path: 'conclusion',
    component: ConclusionComponent,
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
