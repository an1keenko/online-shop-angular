import {Component, OnInit} from '@angular/core';
import {IProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  constructor(private productsService: ProductsService, public dialog: MatDialog) {
  }
  products: IProducts[];
  productsSubscription: Subscription;
  basket: IProducts[];
  basketSubscription: Subscription;

  canEdit: boolean = false;

  ngOnInit(): void {
    this.canEdit = true
    this.productsSubscription = this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });

    this.basketSubscription = this.productsService.getProductFromBasket().subscribe((data) => {
      this.basket = data
    })
  }

  addToBasket(product: IProducts) {
    product.quantity = 1;
    let findItem;

    if (this.basket.length > 0) {
      findItem = this.basket.find((item) => item.id === product.id);
      if (findItem) this.updateBasket(findItem);
      else this.postToBasket(product);
    } else this.postToBasket(product);
  }

  postToBasket(product: IProducts) {
    this.productsService.postProductToBasket(product).subscribe((data) => {
      this.basket.push(data)
    })
  }

  updateBasket(product: IProducts) {
    product.quantity += 1
    this.productsService.updateProductToBasket(product).subscribe(() => {})
  }

  deleteItem(id: number) {
    this.productsService.deleteProduct(id).subscribe(() => this.products.find((item) => {
      if (id === item.id) {
        this.products.splice(this.products.indexOf(item), 1)
      }
    }))
  }

  openDialog(product?: IProducts): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px'
    dialogConfig.disableClose = true
    dialogConfig.data = product

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
     if (data) {
       if (data.id) {
         this.updateData(data)
       }
       else {
         this.postData(data)
       }
     }
    })
  }

  postData(data: IProducts) {
    this.productsService.postProduct(data).subscribe((data) => this.products.push(data))
  }

  updateData(product: IProducts) {
    this.productsService.updateProduct(product).subscribe((data) => {
      this.products = this.products.map((product) => {
         if (product.id === data.id) return data
         else return product
      })
    })
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }
}
