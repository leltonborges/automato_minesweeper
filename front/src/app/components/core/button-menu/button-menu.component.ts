import { Component, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { AnimationProp, FaIconComponent, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { RouterLinkActive } from '@angular/router';

@Component({
             selector: 'app-button-menu',
             standalone: true,
             imports: [FontAwesomeModule, MatButtonModule],
             templateUrl: './button-menu.component.html',
             styleUrl: './button-menu.component.sass'
           })
export class ButtonMenuComponent {
  @ViewChild('faIcon')
  private _icon!: FaIconComponent;
  @ViewChild('matButton')
  private _matButton!: MatButton;

  @Input({ alias: 'icon', required: true })
  icon!: IconProp;
  @Input({ alias: 'animationType', required: true })
  animationType!: AnimationProp;
  @Input({ alias: 'label', required: true })
  label!: string;

  constructor(private renderer: Renderer2,
              private routerLinkActive: RouterLinkActive,
              library: FaIconLibrary) {
    library.addIconPacks(fas, far);
    this.checkActiveStatus();
  }

  @HostListener('click')
  checkActiveStatus() {
    this.routerLinkActive.isActiveChange.subscribe(active => {
      if (active) this.setAnimationIcon();
      else this.removeAnimation();
    });
  }

  setAnimationIcon() {
    this.renderer.addClass(this._matButton._elementRef.nativeElement, 'active');
    this._icon.animation = this.animationType;
    this._icon.render();
  }

  removeAnimation() {
    this.renderer.removeClass(this._matButton._elementRef.nativeElement, 'active');
    this._icon.animation = undefined;
    this._icon.render();
  }
}
