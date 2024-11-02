import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) { }

  buscarProdutos(){
    return this.http.get("https://fakestoreapi.com/products");
  }

  buscarProduto(id:number){
    return this.http.get(`https://fakestoreapi.com/products/${id}`);
  }

  buscarProdutosPorCategoria(categoria: string){
    return this.http.get(`https://fakestoreapi.com/products/category/${categoria}`);
  }

  buscarCategorias(){
    return this.http.get("https://fakestoreapi.com/products/categories");
  }
}
