import { Component, OnInit } from '@angular/core';
import { HttpRequests } from "../http-requests";

function randomIntFromInterval(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

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

  constructor() { }

  async ngOnInit(): Promise<void> {
    // @ts-ignore
    document.getElementById("game").style.display = "none"
    let anime = await this.requests.get("anime", 10)

    while (true) {
      this.randomAnime1 = await anime[randomIntFromInterval(0, 249)]
      this.randomAnime2 = await anime[randomIntFromInterval(0, 249)]

      // @ts-ignore
      if (!(this.randomAnime1["mal_id"] == this.randomAnime2["mal_id"])) {
        break
      }
    }

    this.randomAnime = [this.randomAnime1, this.randomAnime2]

    console.log(this.randomAnime1)
    console.log(this.randomAnime2)

    // @ts-ignore
    document.getElementById("game").style.display = "block"
    this.disableLoadingScreen()
  }

  disableLoadingScreen() {
    // @ts-ignore
    document.getElementById("loading").remove()
  }


}
