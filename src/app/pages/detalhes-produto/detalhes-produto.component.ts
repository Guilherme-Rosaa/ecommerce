import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../modelos/produto';
import { CartaoProdutoComponent } from '../../componentes/cartao-produto/cartao-produto.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AvaliacaoComponent } from '../../componentes/avaliacao/avaliacao.component';
import { Location } from '@angular/common';
import { LoadingService } from '../../services/loading.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';



@Component({
  selector: 'app-detalhes-produto',
  standalone: true,
  imports: [CommonModule ,CartaoProdutoComponent,AvaliacaoComponent, FormsModule,MatDialogModule,AvaliacaoComponent],
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.scss']
})
export class DetalhesProdutoComponent{
  produtoId: any;
  produto!: Produto;
  produtosCategoria: any[] = [];
  avaliacao: number = 0;
  quantidadeAvaliacao: number = 0;
  carregando: boolean = false;
  quantidade: number = 0o1;
  @ViewChild('avisoCarrinho') avisoCarrinho!: any;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private serviceProdutos: ProdutosService,
    private router: Router,
    private location: Location,
    private loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.produtoId = data.id;
    this.buscarProduto();
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

  buscarProdutosCategoria() {
    this.loadingService.setLoading(true);
    this.serviceProdutos.buscarProdutosPorCategoria(this.produto.category).subscribe({
      next: (resp: any) => {
        if (Array.isArray(resp)) {
          this.produtosCategoria = resp.filter((item: any) => item.id !== this.produto.id);
          console.log('Produtos da categoria:', this.produtosCategoria);
        } else {
          console.warn('Resposta inesperada, não é uma lista de produtos:', resp);
        }
        this.loadingService.setLoading(false);
      },
      error: (error) => {
        console.error('Erro ao buscar produtos por categoria:', error);
        this.loadingService.setLoading(false);
      }
    });
  }

  navegarParaDetalhes(produto:Produto){
    this.router.navigate(['/detalhes', produto.id])
  }

  abriModalDetalhes(id: number){
    console.log("Teste");
    this.dialog.closeAll();
    this.dialog.open(DetalhesProdutoComponent, {
      width: '80%',
      panelClass: 'custom-modal',
      data: { id: id }
    });
  }


  voltarOuRedirecionar() {
    const previousUrl = document.referrer;
    if (previousUrl && previousUrl.includes(window.location.origin)) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
  adicionarCarrinho(){
    this.dialog.open(this.avisoCarrinho, { disableClose: true })
  }
}
