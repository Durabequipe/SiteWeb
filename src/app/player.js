import {
  Player as PlayerElement,
  Project,
  VideoNode,
} from "@shammas44/interactive-video-player";

class PlayerComponent extends HTMLElement {
  constructor() {
    super();
  }
}

customElements.define("my-player", PlayerComponent);
