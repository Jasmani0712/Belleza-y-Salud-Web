import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {
    console.log("De negocio: "+this.dataSharingService.getString());

    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        const negocio = this.dataSharingService.getString();
        if(negocio){     
          this.router.navigate(['/?id_shop='+negocio]);
          
        }else{
          this.router.navigate(['/main']);
        }
      })
      .catch(error => console.log(error));
  }

  onClickLoginGoogle() {
    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response);
        // this.router.navigate(['/main']);
        const negocio = this.dataSharingService.getString();
        if(negocio){     
          this.router.navigate(['/?id_shop='+negocio]);
          
        }else{
          this.router.navigate(['/main']);
        }
      })
      .catch(error => console.log(error))
  }
  registro(){
    this.router.navigate(['/register']);

  }

}
