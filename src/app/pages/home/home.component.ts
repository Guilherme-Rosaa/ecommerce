import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutosService } from '../../services/produtos.service';
import { CommonModule } from '@angular/common';
import { AvaliacaoComponent } from '../../componentes/avaliacao/avaliacao.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { CartaoProdutoComponent } from '../../componentes/cartao-produto/cartao-produto.component';
import { MenuCategoriasComponent } from '../../componentes/menu-categorias/menu-categorias.component';
import { Produto } from '../../modelos/produto';
import { CarrosselImagensComponent } from '../../componentes/carrossel-imagens/carrossel-imagens.component';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CartaoProdutoComponent, MenuCategoriasComponent, CarrosselImagensComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  @ViewChild(MenuCategoriasComponent) filho!: MenuCategoriasComponent;

  produtos: any[]=[];
  categorias: string[] = [];
  categoria: string = "";

  constructor(
    private service: ProdutosService,
    private router: Router,
     private loadingService: LoadingService
  ){}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
  }

  lidarComValorEmitido(valor: Produto[]): void {
    this.produtos = valor;
    this.loadingService.setLoading(false);
  }

  navegarParaDetalhes(produto:Produto){
    this.router.navigate(['/detalhes', produto.id])
  }


}
