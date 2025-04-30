import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Orders';

  theme = signal<'light' | 'dark'>('light')

  toggleTheme() {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(newTheme);
  }
}
