import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { SdgListComponent } from './sdg-list/sdg-list.component';

const routes: Routes = [
  {
    path: '',
    component: SdgListComponent,
  },
  {
    path: 'webdoc',
    component: PlayerComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
