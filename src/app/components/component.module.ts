import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoadingComponent
  ],
  exports: [
    HeaderComponent,
    LoadingComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class ComponentModule { }
