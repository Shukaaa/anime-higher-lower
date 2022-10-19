import { Component, OnInit } from '@angular/core';
import { HttpRequests } from "../http-requests";
import { delay, randomInt } from '../utils';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  requests = new HttpRequests()

  randomAnime1: any
  randomAnime2: any
  randomAnime: any

  // difficulty settings
  max_top_amount = 200

  constructor() { }

  async ngOnInit(): Promise<void> {
    // @ts-ignore
    document.getElementById("game").style.display = "none"

    this.randomAnime1 = await this.requests.getRandom("anime", this.max_top_amount)
    while (true) {
      this.randomAnime2 = await this.requests.getRandom("anime", this.max_top_amount)

      if (!(this.randomAnime1[0]["mal_id"] == this.randomAnime2[0]["mal_id"])) {
        break
      }
      console.log("RETRY MATCHING")
      await delay(1000)
    }

    this.randomAnime = [this.randomAnime1[0], this.randomAnime2[0]]

    console.log(this.randomAnime)

    // @ts-ignore
    document.getElementById("game").style.display = "block"
    // @ts-ignore
    document.getElementById("loading").remove()
  }
}
