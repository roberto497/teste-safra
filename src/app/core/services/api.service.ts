import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  search(q: string, p: number, limit: string): Observable<any> {
    const offset = (p === 0) ? 0 : (p * Number(limit));
    console.log(offset);
    return this.http.get(`${environment.spotityApiUrl}/v1/search`, {
      params: { q, type: 'artist,album,track', limit, offset: offset.toString() }
    });
  }

  getAlbumById(id: string): Observable<any> {
    return this.http.get(`${environment.spotityApiUrl}/v1/albums/${id}`);
  }
}
