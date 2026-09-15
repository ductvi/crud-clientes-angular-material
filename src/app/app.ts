import { Component, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink } from '@angular/router'
import {  MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, RouterLink, MatIconModule, MatFormFieldModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('crud-angular-material-novo');
}
