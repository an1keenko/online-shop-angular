export interface IProducts {
    id?: number;
    title: string;
    price: number;
    image?: string;
    year: number;
    configure: {
      chip: string,
      SSD: string,
      RAM: string,
      display: string,
    }

}
