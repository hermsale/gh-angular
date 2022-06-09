import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

// con esto escuchamos la ruta
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  limit = 10;
  offset = 0;
  products: Product[] = [];

  // este valor se enviara hacia el hijo products
  productId: string | null = null;

  constructor(
    private productsService: ProductsService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productsService.getAll(10, 0).subscribe((data) => {
      this.products = data;
      this.offset += this.limit;
    }); // esto es lo que recibimos por parametro en la url
    this.route.queryParamMap.subscribe(params =>{
      this.productId = params.get('product');
      console.log(this.productId);
    })
  }

  // este boton nos traerá mas productos
  onLoadMore() {
    this.productsService.getAll(10, 0).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
