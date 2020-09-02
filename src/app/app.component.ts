import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  /* templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']*/

  template: `
    <div>
      <router-outlet></router-outlet>  <!-- instead of '<router-outlet>' we will get chosen component for rendering-->
    </div>`
})
export class AppComponent {
  title = 'todolist';
}
