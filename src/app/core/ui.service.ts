import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  dialogOpen = signal(false);
  theme = signal<'light' | 'dark'>('light')

  toggleDialog() {
    this.dialogOpen.update(open => !open);
  }

  toggleTheme() {
    this.theme.update(t => t === 'light' ? 'dark' : 'light');
  }
}
