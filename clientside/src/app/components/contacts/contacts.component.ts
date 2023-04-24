import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
contactData:any =[]
form!:FormGroup
submitted:boolean =false
  constructor(
    private api:ApiService,
    private swal:SwalService,
    private fb:FormBuilder
      ) {this.addcontact() }

  ngOnInit(): void {
    this.getContactsByUser()
  }

  getContactsByUser(){
    this.api.getContactsByUser().subscribe((res:any)=>{
      if(res.code == 200){
       this.contactData = res.data
      }else{
        this.contactData =[]
        this.swal.toast_error(res.message)
      }
    },(err)=>{
      this.swal.toast_error(err)
    })
  }

  addcontact(){
    this.form = this.fb.group({
      fullname:['',[Validators.required]],
      address:['',[Validators.required]],
      phone:['', [Validators.required, Validators.minLength(10), Validators.pattern(/^[6-9]\d{9}$/)]],
      zip:['',[Validators.required,Validators.minLength(6),Validators.pattern(/^[0-9]\d{5}$/)]],
      email:['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]]
    })
  }
  modalType:any = 'add'
  id:any =''
  addContactModel(type:any,data:any=''){
    this.form.reset()
    this.modalType = type
    if(type=='add'){

    }else{
      this.form.patchValue(data)
      this.id = data._id
    }
  }
  addContact(){
    this.submitted =true
    if(this.form.valid){
      this.api.addContact(this.form.value).subscribe((res:any)=>{
        this.submitted = false
        if(res.code==200){
          this.swal.toast_success(res.message)
          this.getContactsByUser()
          document.getElementById('close')?.click()
        }else{
          this.swal.toast_error(res.message)
        }
      },(err)=>{
        this.submitted = false
        this.swal.toast_error(err)
      })
    }else{
      this.swal.toast_error('Invalid Form')
    }
  }

  updateContact(){
    this.submitted =true
    if(this.form.valid){
      this.api.updateContact(this.form.value,this.id).subscribe((res:any)=>{
        this.submitted = false
        if(res.code==200){
          this.swal.toast_success(res.message)
          this.getContactsByUser()
          document.getElementById('close')?.click()
        }else{
          this.swal.toast_error(res.message)
        }
      },(err)=>{
        this.submitted = false
        this.swal.toast_error(err)
      })
    }else{
      this.swal.toast_error('Invalid Form')
    }
  }

  removeContact(data:any){
    let callback = (confirm: any) => {
      if (confirm.isConfirmed) {
        this.api.removeContact(data._id).subscribe((res:any)=>{
          if(res.code==200){
            this.swal.toast_success(res.message)
            this.getContactsByUser()
          }else{
            this.swal.toast_error(res.message)
          }
        },(err)=>{
          this.submitted = false
          this.swal.toast_error(err)
        })
      }
    }
    this.swal.delete(callback);
  }

}
