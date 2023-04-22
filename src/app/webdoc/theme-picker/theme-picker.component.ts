import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Interaction } from '@shammas44/interactive-video-player';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
})
export class ThemePickerComponent   {
  @Input() themes: Interaction[] = [];
  @Input() initialThemeIndex = 0;
  @Output() choosenTheme = new EventEmitter<Interaction>();

  public onChoosenTheme(interaction: Interaction) {
    this.choosenTheme.emit(interaction);
  }
}
