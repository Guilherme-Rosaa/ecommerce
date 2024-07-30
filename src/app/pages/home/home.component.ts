import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../services/produtos.service';
import { CommonModule } from '@angular/common';
import { AvaliacaoComponent } from '../../componentes/avaliacao/avaliacao.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AvaliacaoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  produtos: any[]=[];

  constructor(private service: ProdutosService){}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.service.buscarProdutos().subscribe((res: any)=>{
      console.log(res);
      this.produtos = res;
    })
  }
}
