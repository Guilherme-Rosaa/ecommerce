import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-avaliacao',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbModule],
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.scss']
})
export class AvaliacaoComponent implements OnInit {

  @Input() avaliacao: number = 0;
  @Input() quantidade: number = 0;

  constructor() { }

  ngOnInit(): void { }

  get stars() {
    return Array(Math.floor(this.avaliacao)).fill(0);
  }

}
