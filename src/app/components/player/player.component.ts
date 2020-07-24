import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  isPlaying = false;
  artist: string = null;
  music: string = null;
  @ViewChild('audio') private audio: ElementRef;

  constructor(private store: Store<any>) { }

  ngAfterViewInit(): void {
    this.audio.nativeElement.addEventListener('playing', (ev: any) => {
      this.isPlaying = true;
    });
    this.audio.nativeElement.addEventListener('pause', (ev: any) => {
      this.isPlaying = false;
    });
    this.audio.nativeElement.addEventListener('ended', (ev: any) => {
      this.isPlaying = false;
    });
  }

  ngOnInit(): void {
    this.store.pipe(
      select('player')
    ).subscribe((state) => {
      this.artist = state.artist;
      this.music = state.music;
      if (state.previewUrl != null) {
        this.audio.nativeElement.src = state.previewUrl;
        this.audio.nativeElement.play();
      }
    });
  }

}
