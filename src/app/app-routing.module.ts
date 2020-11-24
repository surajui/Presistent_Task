import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DraganddropComponent } from './draganddrop/draganddrop.component';


const routes: Routes = [
  {path:'',component:DraganddropComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
