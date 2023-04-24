import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SwalService } from 'src/app/services/swal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
userData:any = {}
editenable:boolean =true
form!:FormGroup
submitted:boolean =false
  constructor(
    private api:ApiService,
    private swal:SwalService,
    private fb:FormBuilder
  ) { this.profile()}

  ngOnInit(): void {
    this.getUserById()
    this.form.disable()
  }
  getUserById(){
    this.api.getUserById().subscribe((res:any)=>{
      if(res.code==200){
        this.userData = res.data
        this.form.patchValue(this.userData)
      }else{
        this.swal.toast_error(res.message)
      }
    },(err)=>{
      this.swal.toast_error(err)
    })
  }

  enableEdit(){
this.editenable = !this.editenable
if(this.editenable){
  this.form.disable()
}else{
  this.form.enable()
}
  }
  profile(){
    this.form = this.fb.group({
      firstname:['',[Validators.required]],
      lastname:['',[Validators.required]],
      email:['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      phone:['', [Validators.required, Validators.minLength(10), Validators.pattern(/^[6-9]\d{9}$/)]],
    })
  }
  updateProfile(){
    this.submitted =true
    if(this.form.valid){
      this.api.updateUserById(this.form.value).subscribe((res:any)=>{
        if(res.code==200){
          this.getUserById()
          this.editenable = false
          this.enableEdit()
          this.swal.toast_success(res.message)
        }else{
          this.swal.toast_error(res.message)
        }
      },(err)=>{
        this.swal.toast_error(err.errors)
      })
    }
  }
}
