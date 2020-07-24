import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS , HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { reducer as searchReducer } from './reducers/search.reducer';
import { reducer as playerReducer } from './reducers/player.reducer';
import { HttpConfigInterceptor } from './core/interceptors/httpconfig.interceptor';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './pages/dashboard/layout/layout.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { AlbumComponent } from './pages/dashboard/album/album.component';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    AlbumComponent,
    PlayerComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      search: searchReducer,
      player: playerReducer
    }),
    DashboardRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
  ]
})
export class DashboardModule { }
