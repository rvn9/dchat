import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {ToastController} from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formSignIn: FormGroup;
  constructor(
      private auth: AuthService,
      public toastController: ToastController
  ) { }

  ngOnInit() {
    this.formSignIn = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }



  // ionViewWillEnter(){
  //   if (this.auth.getMessage()){
  //     this.verification_message = this.auth.getMessage();
  //   }
  // }
  //
  // ionViewWillLeave(){
  //   this.verification_message = this.auth.deleteMessage();
  // }

  async toastLogin(msg) {
    const toast = await this.toastController.create({
      message: msg,
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }


  submitForm(){
    if (this.formSignIn.value.email == null || this.formSignIn.value.password == null){
      this.toastLogin('Email and / or password must not be null.');
    }else{
      this.auth.signInWithEmail(this.formSignIn.value.email, this.formSignIn.value.password )
          .then(result => {
            if (result.user.emailVerified){
              console.log('email is verified');
              // set user session data //
              console.log(result.user.uid);
              this.auth.setUserSession(result.user.uid);
            }else{
              this.toastLogin('Email belum terverifikasi');
            }
          })
          .catch(error => {
            this.toastLogin('Invalid user credentials, please try again.');
          });
    }

    this.formSignIn.reset();
  }





}
