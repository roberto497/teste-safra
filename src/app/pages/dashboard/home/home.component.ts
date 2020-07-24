import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AuthService } from '../../../core/services/auth.service';
import { ApiService } from '../../../core/services/api.service';
import { update, clear } from '../../../actions/search.action';
import { SearchModel } from '../../../core/models/search-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText: string = null;
  isSearching = false;
  totalItems = 0;
  albums: Array<any> = [];

  constructor(
    private router: Router,
    private store: Store<any>,
    private authService: AuthService,
    private apiService: ApiService
    ) {}

  ngOnInit(): void {
    this.store.pipe(
      select('search')
    ).subscribe((state) => {
      console.log(state);
      this.albums = state.albums;
      this.searchText = state.query;
      this.totalItems = state.total;
    });
  }

  search(isClear: boolean = true): void {
    this.isSearching = true;
    const limit = '20';
    let paginaAtual = 0;

    if (!isClear) {
      const currentPage = (this.albums.length / Number(limit));
      paginaAtual = currentPage <= 0 ? 0 : currentPage;
    }

    this.apiService.search(this.searchText, paginaAtual, limit)
    .subscribe((data) => {
      if (data.albums){
        if (isClear) {
          this.store.dispatch(clear({ query: this.searchText }));
        }
        this.store.dispatch(update({
            albums: data.albums.items,
            query: this.searchText,
            total: data.albums.total
        }));
      }
    }, error => {
      console.log(error);
    }).add(() => {
      this.isSearching = false;
    });
  }

  goToAlbum(id: string): void {
    console.log(id);
    this.router.navigate(['/dashboard/album', id]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
