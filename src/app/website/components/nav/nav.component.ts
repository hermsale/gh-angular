import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../../services/store.service'
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category} from '../../../models/category.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  // creamos el array de categorias con el tipado
  categories:Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService:CategoriesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$
    .subscribe(data =>{
      this.profile = data;
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('admin@mail.com', 'admin123')
    .subscribe( () => {
      this.router.navigate(['/profile']);
    });
  }


  // con esto llamamos a todas las categorias y lo guardamos en un array local
  getAllCategories(){
    this.categoriesService.getAll().
    subscribe(data =>{
      this.categories = data;
    })
  }

  // boton logout
  logout(){
    this.authService.logout(); // borramos el token
    this.profile = null; // vaciamos el profile
    this.router.navigate(['/home']); // redireccionamos a /home
  }

}
