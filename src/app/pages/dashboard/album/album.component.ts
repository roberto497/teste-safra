import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { update } from '../../../actions/player.action';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  album: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<any>,
    private apiService: ApiService
  ) {
    this.getAlbum();
  }

  ngOnInit(): void {
  }

  private msToTime(duration: number): string {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const m = (minutes < 10) ? '0' + minutes : minutes;
    const s = (seconds < 10) ? '0' + seconds : seconds;

    return m + ':' + s;
  }

  private getAlbum(): void {
    this.apiService.getAlbumById(this.route.snapshot.params.id)
      .subscribe((data) => {
        this.album = data;
        this.album.tracks?.items.map((item: any) => {
          item.duration = this.msToTime(item.duration_ms);
          return item;
        });
      });
  }

  play(track: any): void {
    console.log(track);

    // this.audio.nativeElement.src = track.preview_url;
    // this.audio.nativeElement.play();
    this.store.dispatch(update(track));
  }
}
