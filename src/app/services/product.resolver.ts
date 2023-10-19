import { Injectable } from '@angular/core';
import {ProductsService} from "./products.service";
import {IProducts} from "../models/products";
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from "@angular/router";
import {Observable, catchError, EMPTY} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IProducts> {
  constructor(private ProductsService: ProductsService, private router: Router) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProducts> {
    return this.ProductsService.getProduct(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(['/products']);
        return EMPTY;
      })
    );
  }
}
