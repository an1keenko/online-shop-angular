import { Component } from '@angular/core';
import {IProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  constructor(private productsService: ProductsService) { }
  basket: IProducts[]
  basketSubscription: Subscription

  ngOnInit(): void {
    this.basketSubscription = this.productsService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    })
  }

  ngOnDestroy(): void {
    if (this.basketSubscription) this.basketSubscription.unsubscribe()
  }

  minusItemFromBasket(product: IProducts) {
    if (product.quantity === 1) {
      this.productsService.removeProductFromBasket(product.id).subscribe(() => {
        let idx = this.basket.findIndex((item) => item.id === product.id)
        this.basket.splice(idx, 1)
      })
    } else {
      product.quantity -= 1
      this.productsService.updateProductToBasket(product).subscribe(() => {})
    }
  }

  plusItemFromBasket(product: IProducts) {
    product.quantity += 1
    this.productsService.updateProductToBasket(product).subscribe(() => {})
  }
}
