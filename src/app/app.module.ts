import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './pages/landing/landing.component';
import { VerticalCarouselComponent } from './pages/vertical-carousel/vertical-carousel.component';
import { ChartsComponent } from './pages/charts/charts.component';
import { UserDetailModalComponent } from './pages/user-detail-modal/user-detail-modal.component';
import { DeleteComponentComponent } from './pages/delete-component/delete-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    VerticalCarouselComponent,
    ChartsComponent,
    UserDetailModalComponent,
    DeleteComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
