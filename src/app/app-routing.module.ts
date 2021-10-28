import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupComponent } from './group/group.component';
import { SettleComponent } from './settle/settle.component';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { ExpenseComponent } from './expense/expense.component';
const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent
  },
  {
    path:"group/:id",
    component:GroupComponent
  },
  {
    path:"settle/:id",
    component:SettleComponent
  },
  {
    path:"create-group",
    component:CreategroupComponent
  },
  {
    path:"member/:id",
    component:ExpenseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
