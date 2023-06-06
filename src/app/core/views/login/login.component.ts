import { Component, OnInit } from '@angular/core';
import {ClerkService} from "../../service/clerk.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _clerkService: ClerkService, private _router: Router) { }

  async ngOnInit() {
    await this._clerkService.load();

    if (await this._clerkService.user) {
      await this._router.navigateByUrl('');
    }

    setTimeout(async () => {
      await this._clerkService.signIn();
    }, 500);

    await this._router.navigateByUrl('');
  }
}
