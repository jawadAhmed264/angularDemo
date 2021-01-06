import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDepComponent } from './list-dep/list-dep.component';

const routes: Routes = [
  {path:"",component:ListDepComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
