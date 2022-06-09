import { Component, OnInit } from '@angular/core';

// esta libreria permite leer parametros que llegan por la url
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';



@Component({
  selector: 'app-category',
  template: `<app-products [productId]="productId" [products]="products"  (loadMore)="onLoadMore()"></app-products>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  limit = 5;
  offset = 0;
  products: Product[] = []; // esto permite un array vacio

  // aca guardamos el categoryId que nos llegue por params, lo iniciamos en null
  categoryId: string | null = null;
  // este valor se enviara hacia el hijo products
  productId: string | null = null;

  constructor(
  //  declaramos el objeto de tipo ActivatedRoute, este objeto es al que le llegan los params por url
   private  route:ActivatedRoute,
   private productsService: ProductsService,

  ) { }

  ngOnInit(): void {
    // el metodo paramMap es el que contiene los params que vienen de una ruta
    this.route.paramMap
    .pipe(
      switchMap(params =>{
        this.categoryId = params.get('id');
        if(this.categoryId){
          return this.productsService.getByCategory(this.categoryId,this.limit,this.offset);
        }
        return []; // devolvemos un array vacio ya que en el tipado permitimos un array vacio
      })
    ).subscribe(data =>{
          this.products = data;
        });
        this.route.queryParamMap.subscribe(params =>{
          this.productId = params.get('product');
          console.log(this.productId);
        })
  }


  onLoadMore() {
    if(this.categoryId){
      this.productsService.getByCategory(this.categoryId,this.limit,this.offset).subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
    }
  }
}
