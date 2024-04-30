import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AnimationProp, FaIconComponent, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

@Component({
             selector: 'app-menu',
             standalone: true,
             imports: [
               MatToolbarModule,
               MatButtonModule,
               MatIconModule,
               MatSidenavModule,
               MatMenuModule,
               MatTooltipModule,
               FontAwesomeModule
             ],
             templateUrl: './menu.component.html',
             styleUrl: './menu.component.sass'
           })
export class MenuComponent {
  private _matButton!: MatButton;
  private _selectIcon!: FaIconComponent;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }

  setAnimationIcon(matbutton: MatButton,
                   icon: FaIconComponent,
                   animation: string){
    if(this._matButton)
      this._matButton._elementRef.nativeElement.classList.remove("active")

    if(this._selectIcon) {
      this._selectIcon.animation = undefined;
      this._selectIcon.render();
    }

    matbutton._elementRef.nativeElement.classList.add("active")
    this._matButton = matbutton

    icon.animation = animation as AnimationProp;
    icon.render()
    this._selectIcon = icon;
  }
}
