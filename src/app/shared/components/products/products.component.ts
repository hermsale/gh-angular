import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { switchMap } from 'rxjs/operators';

import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../../../models/product.model';

import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;

  @Input()products: Product[] = [];

  // enviamos algo desde products (padre) al hijo (product)
  @Input()
    set productId(id: string | null){
      if(id){
        this.onShowDetail(id); // activamos el onShowDetail
      }
    }

  showProductDetail = false;
  productChosen: Product | null = null;

  // envio esto a home
  @Output() loadMore = new EventEmitter();

  // @Output() onLoadMore: EventEmitter = new EventEmitter();
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';


  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  // ahora el onShowDetail se activara por medio del params
  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    // this.toggleProductDetail();
    if(!this.showProductDetail){ // si esta cerrado, lo abrimos
      this.showProductDetail = true; // showProductDetail activa una clase [class.active]="showProductDetail" en el html
    }

    this.productsService.getOne(id).subscribe(
      (data) => {
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      (errorMsg) => {
        window.alert(errorMsg);
        this.statusDetail = 'error';
      }
    );
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo prodcuto',
      description: 'bla bla bla',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 1000,
      categoryId: 2,
    };
    this.productsService.create(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    if (this.productChosen) {
      const changes: UpdateProductDTO = {
        title: 'change title',
      };
      const id = this.productChosen?.id;
      this.productsService.update(id, changes).subscribe((data) => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.productChosen?.id
        );
        this.products[productIndex] = data;
        this.productChosen = data;
      });
    }
  }

  deleteProduct() {
    if (this.productChosen) {
      const id = this.productChosen?.id;
      this.productsService.delete(id).subscribe(() => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.productChosen?.id
        );
        this.products.splice(productIndex, 1);
        this.showProductDetail = false;
      });
    }
  }

  onLoadMore() {
    this.loadMore.emit();
    console.log('se emitio')
  }

}
