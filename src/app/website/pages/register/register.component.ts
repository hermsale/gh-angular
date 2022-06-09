import { Component, OnInit } from '@angular/core';
import { OnExit } from 'src/app/guards/exit.guard';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

  constructor() { }

  // onExit(){
  //   const rta = confirm('Logica desde Comp, estas seguro de salir?');
  //   return rta;
  // }


  onExit(){
    const confirm = Swal.fire({
      title: 'Desea salir?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      }
      return false
    });
    return confirm
  }

}
