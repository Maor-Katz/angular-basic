import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';


const routes: Routes = [
  { path: "add", component: AddComponent },
  { path: "home", component: ListComponent },
  { path: "", pathMatch: "full", component: ListComponent },// pathmatch = exact path
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
