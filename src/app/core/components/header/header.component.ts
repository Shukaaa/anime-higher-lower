import { Component } from '@angular/core';
import {ClerkService} from "../../service/clerk.service";

@Component({
  selector: 'component-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private _clerkService: ClerkService) { }

  async ngAfterViewInit(): Promise<void> {
    await this._clerkService.load();
    this._clerkService.mountUserButton(document.getElementById('user-button'));
  }
}
