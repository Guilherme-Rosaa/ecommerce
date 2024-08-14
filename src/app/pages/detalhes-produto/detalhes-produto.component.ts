import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../modelos/produto';
import { CartaoProdutoComponent } from '../../componentes/cartao-produto/cartao-produto.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AvaliacaoComponent } from '../../componentes/avaliacao/avaliacao.component';
import { Location } from '@angular/common';
import { LoadingService } from '../../services/loading.service';
import { DescricaoProdutoComponent } from '../../componentes/descricao-produto/descricao-produto.component';


@Component({
  selector: 'app-detalhes-produto',
  standalone: true,
  imports: [CommonModule ,CartaoProdutoComponent,AvaliacaoComponent, DescricaoProdutoComponent],
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.scss']
})
export class DetalhesProdutoComponent implements OnInit {
  produtoId: any;
  produto!: Produto;
  produtosCategoria: any[] = [];
  avaliacao: number = 0;
  quantidadeAvaliacao: number = 0;

  constructor(
    private route: ActivatedRoute,
    private serviceProdutos: ProdutosService,
    private router: Router,
    private location: Location,
    private loadingService: LoadingService
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.produtoId = params.get('id');
      this.buscarProduto();
    });
  }


  buscarProduto(){
    this.loadingService.setLoading(true);
    this.serviceProdutos.buscarProduto(this.produtoId).subscribe((resp: any)=>{

      this.produto = resp;
      this.avaliacao = this.produto.rating.rate;
      this.quantidadeAvaliacao = this.produto.rating.count;
      this.buscarProdutosCategoria();


    })
  }

  formatarMoeda(valor: number|undefined): string {
    if(valor){
      return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
    }

    return ''
  }

  buscarProdutosCategoria(){
    this.serviceProdutos.buscarProdutosPorCategoria(this.produto.category).subscribe((resp:any)=>{
      this.produtosCategoria = resp;
      this.loadingService.setLoading(false);
  })
  }

  navegarParaDetalhes(produto:Produto){
    this.router.navigate(['/detalhes', produto.id])
  }

  currentIndex = 0;

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    }
  }

  next() {
    if (this.currentIndex < this.produtosCategoria.length - 3) {
      this.currentIndex += 1;
    }
  }

  voltarOuRedirecionar() {
    const previousUrl = document.referrer;
    if (previousUrl && previousUrl.includes(window.location.origin)) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
