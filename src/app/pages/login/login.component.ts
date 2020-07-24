import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  login(): void {
    window.location.href = environment.spotityAuthorizeUrl +
    '?response_type=token' +
    '&client_id=' + environment.spotifyClientId +
    '&scope=' + encodeURIComponent('streaming user-read-email user-read-private') +
    '&redirect_uri=' + encodeURIComponent('http://localhost:4200/callback');
  }
}
