import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  constructor(private fb: FormBuilder, private authservice: AuthService, private router: Router){}
  ngOnInit(): void {
    this.resetLoginForm()
  }

  resetLoginForm(){
    this.loginForm = this.fb.group({
      email: [{value:null, disabled:false}, [Validators.required]],
      password: [{value:null, disabled:false} , [Validators.required]]
    })
  }
  submitLogin() {
    const loginValue = this.loginForm.value;
    if (this.authservice.login(loginValue?.email, loginValue?.password)) {
      this.router.navigate(['/dashboard/add-user']);
    } else {
     alert('Invalid credentials');
    }
  }
}
