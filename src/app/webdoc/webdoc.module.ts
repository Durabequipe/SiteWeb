import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlayerRoutingModule } from './player/player-routing.module';
import { PlayerComponent } from './player/player.component';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  declarations: [PlayerComponent, TreeComponent],
  imports: [CommonModule,PlayerRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WebdocModule {}
