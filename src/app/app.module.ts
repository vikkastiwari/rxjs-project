import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IncrementalSearchComponent } from './components/incremental-search/incremental-search.component';
import { DrawingCanvaComponent } from './components/drawing-canva/drawing-canva.component';
import { ShareSubscriptionComponent } from './components/share-subscription/share-subscription.component';
import { PaintComponent } from './components/paint/paint.component';

@NgModule({
  declarations: [
    AppComponent,
    IncrementalSearchComponent,
    DrawingCanvaComponent,
    ShareSubscriptionComponent,
    PaintComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
