import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TreeComponent } from '../tree/tree.component';
import { PlayerComponent } from './player.component';

const routes: Routes = [
  {
    path: '',
    component: PlayerComponent,
  },
  {
    path: 'webdoc/:id/tree',
    component: TreeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerRoutingModule {}
