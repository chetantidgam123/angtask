import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  userData: any = []
  form!: FormGroup;
  submitted: boolean = false;
  loader: boolean = false
  constructor(
    private api: ApiService,
    private swal: SwalService,
    private router: Router,
    private fb: FormBuilder
  ) { this.adduser() }

  ngOnInit(): void {
    this.getUsers()
  }
  getUsers() {
    this.loader = true
    this.api.getUsers().subscribe((res: any) => {
      this.loader = false
      if (res.code == 200) {
        this.userData = res.data
      } else {
        this.userData = []
        this.swal.toast_error(res.message)
      }
    }, (err) => {
      this.loader = false
      this.userData = []
      this.swal.toast_error(err)
    })
  }
  getvalue(ev: any, id: any) {
    let obj: any = {}
    if (ev.target.checked) {
      obj.userId = id
      obj.status = 1
    } else {
      obj.userId = id
      obj.status = 0
    }
    this.changeStatusUser(obj)
  }
  changeStatusUser(data: any) {
    this.api.changeStatusUser(data).subscribe((res: any) => {
      if (res.code == 200) {
        this.swal.toast_success(res.message)
      } else {
        this.swal.toast_error(res.message)
      }
    }, (err) => {
      this.swal.toast_error(err)
    })
  }
  gotoContact(id: any) {
    this.router.navigate(['/contacts/' + id])
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
  signup() {
    this.submitted = true
    if (this.form.valid) {
      this.api.signup(this.form.value).subscribe((res: any) => {
        this.submitted = false
        if (res.code == 200) {
          document.getElementById('close1')?.click()
          this.getUsers()
          this.swal.toast_success(res.message)
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
  removeUser(data: any) {
    let callback = (confirm: any) => {
      if (confirm.isConfirmed) {
        this.api.removeUser(data).subscribe((res: any) => {
          if (res.code == 200) {
            this.swal.toast_success(res.message)
            this.getUsers()
          } else {
            this.swal.toast_error(res.message)
          }
        }, (err) => {
          this.submitted = false
          this.swal.toast_error(err)
        })
      }
    }
    this.swal.delete(callback);
  }
  modalType: any = 'add'
  id: any = ''
  addUserModel(type: any, data: any = '') {
    this.form.reset()
    this.modalType = type
    if (type == 'add') {

    } else {
      this.form.patchValue(data)
      this.id = data._id
    }
  }
  updateUser() {
    this.submitted = true
    if (this.form.valid) {
      this.api.updateUser(this.form.value, this.id).subscribe((res: any) => {
        this.submitted = false
        if (res.code == 200) {
          document.getElementById('close1')?.click()
          this.swal.toast_success(res.message)
          this.getUsers()
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
}
