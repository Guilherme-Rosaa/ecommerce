import { Component, ElementRef, Input, input, ViewChild } from '@angular/core';
import { AvaliacaoComponent } from '../avaliacao/avaliacao.component';
import { Produto } from '../../modelos/produto';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-cartao-produto',
  standalone: true,
  imports: [AvaliacaoComponent,CommonModule ],
  templateUrl: './cartao-produto.component.html',
  styleUrl: './cartao-produto.component.scss'
})


export class CartaoProdutoComponent {
  @ViewChild('cardProduto') cardProduto!: ElementRef;
  @Input() produto!: Produto ;
  width: any;

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  ngAfterViewInit() {
    window.onload = () => {
      const element = this.cardProduto.nativeElement;
      this.width = element.getBoundingClientRect().width;
    };
  }
}


