import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { HeroComponent } from './home/hero/hero.component';
import { AboutComponent } from './home/about/about.component';
import { ServicesComponent } from './home/services/services.component';
import { CardComponent as ServiceCardComponent } from './home/services/card/card.component';
import { TestimoniesComponent } from './home/testimonies/testimonies.component';
import { CardComponent as TestimonyCardComponent } from './home/testimonies/card/card.component';
import { ContactComponent } from './home/contact/contact.component';
import { AdminModule } from './admin/admin.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    ServiceCardComponent,
    TestimoniesComponent,
    TestimonyCardComponent,
    ContactComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
