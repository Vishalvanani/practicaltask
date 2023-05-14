import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private commonService: CommonService
  ) {}

  // --- initialization
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // --- Handle Login
  async login() {
    // check validation for login
    if (
      this.loginForm.value.email.toLowerCase() == 'test@test.com' &&
      this.loginForm.value.password == '8256455'
    ) {
      // --- save user data into preference after login success
      await Preferences.set({
        key: 'user',
        value: JSON.stringify(this.loginForm.value),
      });

      // Redirect home page if login success
      this.router.navigateByUrl('/home');
    } else {
      // Show error message if login failed
      this.commonService.errorMessage('Wrong email or password.');
    }
  }
}
