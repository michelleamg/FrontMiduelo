import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./compartidos/nav-bar/nav-bar.component";
import { FoodComponent } from "./compartidos/food/food.component";
import { LoginComponent } from "./estaticos/login/login.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, FoodComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aplicacionWeb';
}
