import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  oldpass: any = ''
  newpass: any = ''
  cnfpass: any = ''
  admin: any = ''
  submitted: boolean = false
  constructor(
    private api: ApiService,
    private swal: SwalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.admin = localStorage.getItem('role')
  }
  resetPass() {
    this.submitted = true;
    if (this.oldpass == '' || this.cnfpass == '' || this.newpass == '') {
      this.swal.toast_error('All Feilds are Required')
      return
    }
    if (this.newpass != this.cnfpass) {
      this.swal.toast_error('Confirm Password does not match with New Password')
      return
    }
    this.api.resetPass({ oldPassword: this.oldpass, newPassword: this.newpass }).subscribe((res: any) => {
      if (res.code == 200) {
        this.swal.toast_success(res.message)
        document.getElementById('close')?.click()
      } else {
        this.swal.toast_error(res.message)
      }
    }, (err) => {
      this.swal.toast_error(err)
    })
  }
  logout() {
    const callback = async (result: any) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigate(['signin'])
      }
    }
    this.swal.logout(callback)
  }
}
