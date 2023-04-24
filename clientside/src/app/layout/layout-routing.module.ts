import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from '../components/signin/signin.component';
import { DashBoardComponent } from '../components/dash-board/dash-board.component';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../gaurd/auth.guard';
import { ContactsComponent } from '../components/contacts/contacts.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { AdminUsersComponent } from '../components/admin-users/admin-users.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: 'dashboard',
      component: DashBoardComponent
    },
    {
      path: 'contacts',
      component: ContactsComponent
    },
    {
      path: 'contacts/:id',
      component: ContactsComponent
    },
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: 'admin-users',
      component: AdminUsersComponent
    }
  ],
  canActivate: [AuthGuard]
},
{
  path: 'signin',
  component: SigninComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
