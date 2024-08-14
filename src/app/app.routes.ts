import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetalhesProdutoComponent } from './pages/detalhes-produto/detalhes-produto.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detalhes/:id', component: DetalhesProdutoComponent },
];
