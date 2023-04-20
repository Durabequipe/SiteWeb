import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { PlayerRoutingModule } from './player/player-routing.module';
import { PlayerComponent } from './player/player.component';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  declarations: [PlayerComponent, TreeComponent],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    NavigationComponent,
    ButtonComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WebdocModule {}
