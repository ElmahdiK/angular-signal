import {Component} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, RouterOutlet, RouterModule]
})
export class AppComponent {
    title = 'angular-signal';
}
