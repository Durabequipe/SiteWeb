import { Component } from '@angular/core';
type Theme = {
  name: string;
  videoId: string;
};

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
})
export class ThemePickerComponent {
  public themes:Theme[];

  constructor(){
    this.themes = [
      {name:'theme1',videoId:''},
      {name:'theme2',videoId:''},
      {name:'theme3',videoId:''},
      {name:'theme4',videoId:''},
    ]
  }
}
