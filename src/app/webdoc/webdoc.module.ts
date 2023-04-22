import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { PlayerRoutingModule } from './player/player-routing.module';
import { PlayerComponent } from './player/player.component';
import { TreeComponent } from './tree/tree.component';
import { PopupComponent } from './popup/popup.component';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';

@NgModule({
  declarations: [PlayerComponent, TreeComponent, PopupComponent, ThemePickerComponent],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    NavigationComponent,
    ButtonComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WebdocModule {}
