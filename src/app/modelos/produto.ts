export interface Avaliacao {
  rate: number;
  count: number;
}

export interface Produto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Avaliacao;
}
