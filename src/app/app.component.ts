import { Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./components/header/header.component";
import { UiService } from './core/ui.service';
import { CreateComponent } from './orders/create/create.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent, CreateComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  private ui = inject(UiService);
  theme = this.ui.theme;
}
