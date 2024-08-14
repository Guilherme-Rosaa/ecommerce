import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carrossel-imagens',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './carrossel-imagens.component.html',
  styleUrls: ['./carrossel-imagens.component.scss']
})
export class CarrosselImagensComponent {
  @Input() midias: { src: string, tipo: 'imagem' | 'video' }[] = [];
  imagemAtualIndex: number = 0;
  intervaloTroca: number = 3000;
  intervaloId: any;

  ngOnInit() {
    //this.iniciarTrocaAutomatica();
  }

  ngOnDestroy() {
    if (this.intervaloId) {
      clearInterval(this.intervaloId);
    }
  }

  mostrarImagem(index: number) {
    this.imagemAtualIndex = index;
  }

  proximaImagem() {
    this.imagemAtualIndex = (this.imagemAtualIndex + 1) % this.midias.length;
  }

  imagemAnterior() {
    this.imagemAtualIndex = (this.imagemAtualIndex - 1 + this.midias.length) % this.midias.length;
  }

  iniciarTrocaAutomatica() {
    this.intervaloId = setInterval(() => {
      this.proximaImagem();
    }, this.intervaloTroca);
  }

  isTheaterMode = true;

  toggleTheaterMode(): void {
    this.isTheaterMode = !this.isTheaterMode;
  }
}
