import { Component, AfterContentInit, OnDestroy } from '@angular/core';
import treeMaker from '../../lib/tree';
import { Tree, TreeParams } from '../../models/treemaker';
import { VideoNode, Interaction } from '@shammas44/interactive-video-player';
import { Location } from '@angular/common';
import { Project } from '../../models/projects';
import { ProjectService } from 'src/app/services/project.service';
import { WatchedSequenceService } from 'src/app/services/watched-video.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { videoToMap } from 'src/app/lib/utils';
import { ToolTipStyle, TooltipClass } from 'src/app/models/tree';
import { Video, LocationData } from 'src/app/models/projects';

const MSG = {
  ERROR_INFINITE_TREE:
    'A video interaction is not allowed to point to a previous video.',
};

function px(x: number) {
  return `${x}px`;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements AfterContentInit, OnDestroy {
  public tree: Tree = {};
  public treeParams: TreeParams = {};
  public videos: Map<string, Video> = new Map();
  public project: Project | null = null;
  private visitedVideoNodes = new Set();
  public videoId = '/';
  private sdgId = '';
  public themes: Interaction[] | [] = [];
  public initialThemeIndex = 0;

  constructor(
    private location: Location,
    private api: ProjectService,
    private watchedSequenceService: WatchedSequenceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const data = this.location.getState() as LocationData;
    this.project = data.project || null;
    this.sdgId = document.location.pathname.split('/')[2];
    this.setSdgColor(this.sdgId);
    if (!this.project) {
      this.fetchProject(this.sdgId);
    }
  }

  ngOnDestroy() {
    window.onresize = null;
  }

  setSdgColor(id: string) {
    document.documentElement.style.setProperty(
      '--current-sdg-color',
      `var(--sdg${id}-color)`
    );
  }

  ngAfterContentInit() {
    this.route.queryParamMap.subscribe((params: any) => {
      if (this.project) {
        this.videos = videoToMap(this.project.videos) as Map<string, Video>;
        this.setAvailableThemes();

        const themeId = params.params.id || this.themes[0].id;
        this.themes.forEach((theme, i) => {
          if (theme.id == themeId) this.initialThemeIndex = i;
        });
        this.drawTree(themeId);
      }
    });
  }

  setAvailableThemes() {
    if (this.project) {
      const videoContainingThemes = (this.project.videos as Video[]).filter(
        (video) => {
          if (video.canChooseTheme) return video;
          return;
        }
      );
      const themes = videoContainingThemes.map((video) => {
        return video?.interactions;
      })[0];
      this.themes = themes || [];
    }
  }

  togglePicker() {
    const picker = document.querySelector('app-theme-picker');
    if (picker) {
      picker.classList.toggle('is-display-none');
    }
  }

  async fetchProject(sdgId: string) {
    const projects = await this.api.getPlayers();
    const project = projects.filter((p) => {
      if (p.description === sdgId) return p;
      return;
    });
    if (project.length > 0) {
      this.project = project[0];
      this.ngAfterContentInit();
    }
  }

  onChoosenTheme(theme: Interaction) {
    this.drawTree(theme.id);
    const firstP = document.querySelector(
      '.tree__container__step__card__p:first-child'
    ) as HTMLParagraphElement;
    if (firstP) {
      firstP.innerText = theme.content
    }
  }

  private getHideTooltip(tooltip: HTMLElement) {
    return (e: Event) => {
      if (window.innerWidth > 800) {
        const event = e as MouseEvent;
        const [top, left] = [px(event.clientY + 20), px(event.clientX + 20)];
        const css = { top, left, cssClass: TooltipClass.displayNone };
        this.styleTooltip(tooltip, css);
        const button = tooltip.querySelector('button');
        if (button) button.setAttribute('disabled', 'true');
      }
    };
  }

  private styleTooltip(tooltip: HTMLElement, style: ToolTipStyle) {
    tooltip.classList.forEach((cssClass) => {
      tooltip.classList.remove(cssClass);
    });
    if (style.cssClass) tooltip.classList.add(style.cssClass);
    tooltip.style.top = style.top;
    tooltip.style.left = style.left;
  }

  private getShowTooltip(tooltip: HTMLElement) {
    return (e: Event) => {
      const event = e as MouseEvent;
      tooltip?.classList.remove('is-display-none');
      const [x, y] = [event.clientX, event.clientY];
      const id = (e.target as HTMLElement).id.split('_')[1];
      const video = this.videos.get(id) as Video;
      this.videoId = id;

      const cssClass = TooltipClass.displayTop;
      const windowHalfSize = window.innerWidth / 2;
      const bonusSpace = event.clientX > windowHalfSize ? 392 : 0;

      const top = { top: 'unset', left: 'unset', cssClass };
      const normal = { top: px(y + 20), left: px(x + 20 - bonusSpace) };
      const button = tooltip.querySelector('button');
      if (button) button.setAttribute('disabled', 'false');

      if (video.content) {
        const paragraph = tooltip.querySelector('p');
        if (paragraph) paragraph.innerText = video?.content ?? '';
        window.innerWidth > 800
          ? this.styleTooltip(tooltip, normal)
          : this.styleTooltip(tooltip, top);
      }
    };
  }

  private getCardClickEvent() {
    return (e: HTMLElement) => {
      const id = e.id.split('_')[1];
      if (window.innerWidth > 800) {
        this.router.navigate([`/webdoc/${this.sdgId}`], {
          queryParams: { id: id },
        });
      }
    };
  }

  followLink(e: any) {
    console.log(e);
    this.router.navigate([`/webdoc/${this.sdgId}`], {
      queryParams: { id: this.videoId },
    });
  }

  closePopup() {
    const tooltip = document.querySelector('#tooltip');
    tooltip?.classList.add('is-display-none');
  }

  private drawTree(entrypointId: string) {
    try {
      this.tree = {};
      this.generateTree(this.videos.get(entrypointId) as Video, this.tree);

      treeMaker(this.tree, {
        id: 'tree',
        card_click: this.getCardClickEvent(),
        treeParams: this.treeParams,
        link_width: '4px',
        link_color: 'white',
      });

      const tooltip = document.querySelector('#tooltip') as HTMLElement;
      if (tooltip) {
        document
          .querySelectorAll('.tree__container__step__card p')
          .forEach((p, i) => {
            if (i != 0) {
              p.addEventListener('mousemove', this.getShowTooltip(tooltip));
              p.addEventListener('mouseleave', this.getHideTooltip(tooltip));
            }
          });
      }
    } catch (error) {
      const e = error as Error;
      console.warn(e);
      const tree = document.querySelector('#tree') as HTMLDivElement;
      if (tree) {
        tree.innerText = MSG.ERROR_INFINITE_TREE;
      }
    }
  }

  private setStyles(id: string) {
    const isAlreadyWatched = this.watchedSequenceService.isWatched(id);
    return isAlreadyWatched
      ? { background: 'var(--current-sdg-color)', color: 'white' }
      : { background: '#9E9E9E', color: 'white' };
  }

  private generateTree(node: Video, ref: Tree) {
    this.treeParams[node.id] = {
      trad: this.themes[this.initialThemeIndex].content,
      styles: this.setStyles(node.id),
    };
    this.tree[node.id] = {};
    this.generateNode(node, ref[node.id], 1);
  }

  private generateNode(node: Video, ref: Tree, depth: number) {
    if (this.visitedVideoNodes.has(node.id)) {
      throw new Error(MSG.ERROR_INFINITE_TREE);
    }

    let letter = 97;
    for (const interaction of node?.interactions ?? []) {
      const video = this.videos.get(interaction.id) as Video;
      video.content = interaction.content;
      this.videos.set(interaction.id, video);
      ref[video.id] = {};
      const newRef = ref[video.id];
      this.treeParams[video.id] = {
        trad: `${depth}${String.fromCharCode(letter)}`,
        styles: this.setStyles(interaction.id),
      };
      letter++;
      this.generateNode(video, newRef, depth + 1);
    }
  }
}
