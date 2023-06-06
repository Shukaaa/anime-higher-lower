import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClerkService {
  Clerk: any;
  delay: number = 100;

  constructor() {
    this.initialize();
  }

  initialize() {
    // @ts-ignore
    this.Clerk = window.Clerk;
  }

  get clerk() {
    return this.Clerk;
  }

  async load() {
    try {
      await this.Clerk.load();
    } catch (e) {
      setTimeout(() => {
        this.initialize();
        this.load();
      }, this.delay);
    }
  }

  get user() {
    try {
      return this.Clerk.user;
    } catch (e) {
      setTimeout(async () => {
        await this.load();
        this.user;
      }, this.delay);
    }
  }

  async signIn() {
    try {
      this.Clerk.openSignIn();
    } catch (e) {
      setTimeout(() => {
        this.load();
        this.Clerk.signIn();
      }, this.delay);
    }
  }

  mountUserButton(element: HTMLElement | null) {
    this.Clerk.mountUserButton(element);
  }
}
