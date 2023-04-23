import {Project} from './projects'

export enum TooltipClass {
  displayNone = 'is-display-none',
  displayTop = 'tooltip--top',
}

export type ToolTipStyle = {
  top: string;
  left: string;
  cssClass?: TooltipClass;
};

