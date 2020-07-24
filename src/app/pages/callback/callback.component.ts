import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {

    this.route.fragment.subscribe((params) => {
      const info = new URLSearchParams(params);
      const accesstoken = info.get('access_token');
      if (accesstoken) {
        this.authService.authenticate(accesstoken);
        this.router.navigate(['/dashboard/home']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
