import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonMenuComponent } from '../button-menu/button-menu.component';

@Component({
             selector: 'app-menu',
             standalone: true,
             imports: [RouterOutlet, RouterLink, RouterLinkActive, ButtonMenuComponent],
             templateUrl: './menu.component.html',
             styleUrl: './menu.component.sass'
           })
export class MenuComponent {

}
