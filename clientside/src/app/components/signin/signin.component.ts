import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  data: any = {}
  form!: FormGroup
  type: any = 'login'
  submitted: boolean = false
  constructor(
    private api: ApiService,
    private swal: SwalService,
    private router: Router,
    private fb: FormBuilder
  ) { this.adduser() }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null && localStorage.getItem('token') != "" && localStorage.getItem('token') != undefined) {
      this.router.navigate(['/dashboard']);
      return
    } else { }
  }
  login() {
    if (this.data.email && this.data.password) {
      this.api.Login(this.data).subscribe((res: any) => {
        if (res.code == 200) {
          this.swal.toast_success(res.message)
          localStorage.setItem('token', res.token)
          localStorage.setItem('role', res.role)
          if (res.role == 'user') {
            this.router.navigate(['/dashboard'])
          } else {
            this.router.navigate(['/admin-users'])
          }
        } else {
          this.swal.toast_error(res.message)
        }
      })
    } else {
      this.swal.toast_error('Invalid details')
    }
  }
  signup() {
    this.submitted = true
    if (this.form.valid) {
      this.api.signup(this.form.value).subscribe((res: any) => {
        this.submitted = false
        if (res.code == 200) {
          this.swal.toast_success(res.message)
          this.toggle('login')
        } else {
          this.swal.toast_error(res.message)
        }
      }, (err) => {
        this.submitted = false
        this.swal.toast_error(err)
      })
    } else {
      this.swal.toast_error('Invalid Form')
    }
  }

  toggle(type: any) {
    this.type = type
  }
  adduser() {
    this.form = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^[6-9]\d{9}$/)]]
    })
  }
}
