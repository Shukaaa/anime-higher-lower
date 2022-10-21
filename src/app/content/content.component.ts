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
  score = 0

  // difficulty settings
  max_top_amount = 200

  constructor() { }

  async ngOnInit(): Promise<void> {
    await this.viewControllFirst()
    await this.loadNewGameData()
    await this.viewControllSecond()
  }

  async chooseAnime(i: number) {
    await this.viewControllFirst()

    let j = 0
    if (i == 0) {
      j = 1
    }

    let chosenAnime = this.randomAnime[i]
    let secondAnime = this.randomAnime[j]

    if (chosenAnime.members >= secondAnime.members) {
      this.score++
      alert("You're right! New Score: " + this.score)
      await this.loadNewGameData()
      await this.viewControllSecond()
    } else {
      alert("You're wrong :(")
      await this.loadNewGameData()
      this.score = 0
      await this.viewControllSecond()
    }
  }

  async viewControllFirst() {
    // @ts-ignore
    document.getElementById("game").style.display = "none"
    // @ts-ignore
    document.getElementById("loading").style.display = "block"
  }

  async viewControllSecond() {
    // @ts-ignore
    document.getElementById("game").style.display = "block"
    // @ts-ignore
    document.getElementById("loading").style.display = "none"
  }

  async loadNewGameData() {
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
  }
}
