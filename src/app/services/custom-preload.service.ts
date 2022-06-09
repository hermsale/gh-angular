import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadService implements PreloadingStrategy{
  constructor() { }
  // creamos una estrategia de precarga en el metodo preload
  // luego creamos el metodo load, que recibira una funcion, sin embargo retornamos un observable any
  // todo esto como ultimo tambien retornada un Observable any
  preload(route:Route, load: () => Observable<any>):Observable<any>{
    // aca elegimos que ruta pre cargar
    // le decimos que queremos ir a la data de una ruta
    //  y consultamos si en esa data esta habilitado la opcion ['preload']
    // si se cumple todo eso vamos a habilitar el metodo 'load'
    if(route.data && route.data['preload']){
      return load();
    }
    // si no se cumple la condicion, enviamos un Observable en vacio
    return of(null)
  }
}
