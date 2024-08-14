import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarregamentoComponent } from './componentes/carregamento/carregamento.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarregamentoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'ecommerce';

  constructor(){}


}
