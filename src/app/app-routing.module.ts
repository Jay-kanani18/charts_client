import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChartsComponent } from './pages/charts/charts.component';

const routes: Routes = [{path:"",component:HomeComponent},{path:"charts/:id",component:ChartsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
