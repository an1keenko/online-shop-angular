export interface IProducts {
    id: number;
    title: string;
    price: number;
    image?: string;
    year: number;
    quantity: number;
    configure: {
      chip: string,
      SSD: string,
      RAM: string,
      display: string,
    }

}
