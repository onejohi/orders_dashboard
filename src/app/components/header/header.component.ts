import { Component, inject } from '@angular/core';
import { UiService } from '../../core/ui.service';

@Component({
  selector: 'app-header',
  imports: [],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private ui = inject(UiService);

  toggleDialog() {
    this.ui.toggleDialog();
  }

  toggleTheme() {
    const newTheme = this.ui.theme() === 'light' ? 'dark' : 'light';
    this.ui.theme.set(newTheme);
  }
}
