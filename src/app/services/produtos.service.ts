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
}
