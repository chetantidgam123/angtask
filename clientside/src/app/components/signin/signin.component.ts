import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
data:any ={}
  constructor(
    private api:ApiService,
    private swal:SwalService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null && localStorage.getItem('token') != "" && localStorage.getItem('token') != undefined) {
      this.router.navigate(['/dashboard']);
      return
    } else {}
  }
  login(){
    if(this.data.email && this.data.password){
      this.api.Login(this.data).subscribe((res:any)=>{
        if(res.code==200){
          this.swal.toast_success(res.message)
          localStorage.setItem('token',res.token)
          this.router.navigate(['/dashboard'])
        }else{
          this.swal.toast_error(res.message)
        }
      })
    }else{
      this.swal.toast_error('Invalid details')
    }
  }

}
