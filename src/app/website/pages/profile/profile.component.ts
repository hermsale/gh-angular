import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from './../../../models/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;

  constructor(
    private authService:AuthService,
  ) { }


  // solicitamos un profile y lo guardamos en user
  ngOnInit(): void {
    this.authService.user$
    .subscribe( data => {
      this.user = data;
    })
  }

}
