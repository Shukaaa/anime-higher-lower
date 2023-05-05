import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./core/components/header/header.component";
import {LoadingComponent} from "./core/components/loading/loading.component";
import {ContentComponent} from "./core/views/content/content.component";
import {HttpClient} from "./core/http/http-client";
import {WinningComponent} from "./core/views/winning/winning.component";
import {LoosingComponent} from "./core/views/loosing/loosing.component";
import {OptionsComponent} from "./core/views/options/options.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FooterComponent} from "./core/components/footer/footer.component";
import { HighscoreStore } from './core/store/highscore.store';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoadingComponent,
    ContentComponent,
    WinningComponent,
    LoosingComponent,
    OptionsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [
    HttpClient,
    HighscoreStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
