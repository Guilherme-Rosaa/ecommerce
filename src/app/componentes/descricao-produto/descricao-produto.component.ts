import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-descricao-produto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './descricao-produto.component.html',
  styleUrl: './descricao-produto.component.scss',
})
export class DescricaoProdutoComponent {
  @Input() descricao: string = '';
}
