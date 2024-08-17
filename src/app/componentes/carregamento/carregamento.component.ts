import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carregamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carregamento.component.html',
  styleUrl: './carregamento.component.scss'
})
export class CarregamentoComponent {
  loading: boolean = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.getIsLoading().subscribe((isLoading: boolean) => {
      this.loading = isLoading;
    });
  }
}
