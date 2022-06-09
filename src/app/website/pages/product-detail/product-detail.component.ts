import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private route:ActivatedRoute,
    private productsService:ProductsService,
    // private location:Location,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params =>{
        this.productId = params.get('id');
        if(this.productId){
          return this.productsService.getOne(this.productId);
        }
        return [null]; // devolvemos un null - ya que se nos especifico que sea de tipo Product o tipo null
      })
    ).subscribe(data =>{
            this.product = data;
            console.log(this.product);
        })
  }

  // this.location.back();
  goToBack(){
    this.router.navigate(['category/',this.product?.category.id]);
  }

}
