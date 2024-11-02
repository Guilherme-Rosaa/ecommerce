import { Component, ElementRef, Input, input, ViewChild } from '@angular/core';
import { AvaliacaoComponent } from '../avaliacao/avaliacao.component';
import { Produto } from '../../modelos/produto';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetalhesProdutoComponent } from '../../pages/detalhes-produto/detalhes-produto.component';

@Component({
  selector: 'app-cartao-produto',
  standalone: true,
  imports: [AvaliacaoComponent,CommonModule, MatDialogModule],
  templateUrl: './cartao-produto.component.html',
  styleUrl: './cartao-produto.component.scss'
})


export class CartaoProdutoComponent {
  @ViewChild('cardProduto') cardProduto!: ElementRef;
  @Input() produto!: any ;
  width: any;

  constructor(private dialog: MatDialog) {}

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  abriModalDetalhes(){
    console.log("AQUI");

    this.dialog.open(DetalhesProdutoComponent, {
      width: '80%',
      panelClass: 'custom-modal',
      data: { id: this.produto.id }
    });
  }
}


