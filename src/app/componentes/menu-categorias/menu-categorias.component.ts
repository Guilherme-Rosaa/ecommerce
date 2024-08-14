import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../modelos/produto';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-menu-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-categorias.component.html',
  styleUrl: './menu-categorias.component.scss',
})
export class MenuCategoriasComponent implements OnInit {
  @Output() retornaProdutos = new EventEmitter<Produto[]>();
  categorias: string[] = [];
  categoria: string = '';

  constructor(
    private service: ProdutosService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.buscarCategorias();
  }

  buscarCategorias() {
    this.loadingService.setLoading(true);
    this.service.buscarCategorias().subscribe((res: any) => {
      this.categorias = res;

      this.categoria = this.categorias[0];

      this.selecionaCategoria(this.categoria);
    });
  }

  selecionaCategoria(categoria: string) {
    this.loadingService.setLoading(true);
    this.categoria = categoria;
    this.service.buscarProdutosPorCategoria(categoria).subscribe((res: any) => {
      this.loadingService.setLoading(false);
      this.retornaProdutos.emit(res);
    });
  }

  buscarIconeCategoria(categoria: string) {
    switch (categoria) {
      case 'electronics':
        return './../../../assets/icon-mouse.svg';
      case 'jewelery':
        return './../../assets/icon-joias.svg';
      case "men's clothing":
        return './../../assets/icon-homens.svg';
      case "women's clothing":
        return './../../assets/icon-mulheres.svg';
      default:
        return '';
    }
  }
}
