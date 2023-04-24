import {
  Injectable
} from '@angular/core';
// import { resolve } from 'dns';
// import { reject } from 'lodash';
import { Observable, async } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  constructor() { }
  toast_success(msg: any) {
    Swal.fire({
      position: 'top-right',
      icon: 'success',
      toast: true,
      title: msg,
      showConfirmButton: false,
      showCloseButton: true,
      timer: 2000
    });
  }
  
  toast_error(msg: any) {
    Swal.fire({
      position: 'top-right',
      icon: 'error',
      toast: true,
      title: msg,
      showConfirmButton: false,
      showCloseButton: true,
      timer: 2000
    });
  }


  delete(callback:any,confirm_btnName:any='') {
    if(confirm_btnName==''){
      confirm_btnName = 'Yes, delete it!'
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result)   =>  {
      callback(result);
    })
  }

cancel_order(callback:any) {
  Swal.fire({
    title: 'Are you sure?',
    text: "Your order will be moved to cancelled orders",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Cancel it!'
  }).then((result)   =>  {
    callback(result);
  })
}
}
