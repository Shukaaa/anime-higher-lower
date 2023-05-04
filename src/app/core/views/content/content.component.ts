import {AfterViewInit, Component} from '@angular/core';
import { HttpClient } from "../../http/http-client";
import {GameOptions} from "../../types/GameOptions";
import {GameData} from "../../types/GameData";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css', '../view.css']
})
export class ContentComponent implements AfterViewInit {
  options_loaded: boolean = false

  game_data: GameData = {
    score: 0,
    randomEntries: []
  }

  options: GameOptions = {
    max_top_amount: 200,
    game_type: "anime"
  }

  element_section_game: HTMLElement | null = null
  element_section_won: HTMLElement | null = null
  element_section_loose: HTMLElement | null = null
  element_section_loading: HTMLElement | null = null

  constructor(private requests: HttpClient) { }

  async ngAfterViewInit(): Promise<void> {
    this.element_section_game = document.getElementById("game")
    this.element_section_won = document.getElementById("right")
    this.element_section_loose = document.getElementById("loosing")
    this.element_section_loading = document.getElementById("loading")

    this.element_section_game!.style.display = "none"
    this.element_section_won!.style.display = "none"
    this.element_section_loose!.style.display = "none"
    this.element_section_loading!.style.display = "none"
  }

  async start(options: GameOptions) {
    this.options = options
    this.options_loaded = true
    this.element_section_game!.style.display = "block"
    await this.continue()
  }

  async loadNewGameData() {
    this.game_data.randomEntries = await this.requests.getRandomEntry(this.options.game_type, this.options.max_top_amount)
  }

  chooseAnime(i: number) {
    let chosenAnime = this.game_data.randomEntries[i == 0 ? 0 : 1]
    let secondAnime = this.game_data.randomEntries[i == 0 ? 1 : 0]

    this.element_section_game!.style.display = "none"
    if (chosenAnime.members >= secondAnime.members) {
      this.element_section_won!.style.display = "block"
      this.game_data.score++
    } else {
      this.element_section_loose!.style.display = "block"
    }
  }

  hideWinningLoosing() {
    this.element_section_won!.style.display = "none"
    this.element_section_loose!.style.display = "none"
  }

  toggleLoading() {
    this.element_section_game!.style.display = "none"
    this.element_section_loading!.style.display = "block"
  }

  endLoading() {
    this.element_section_game!.style.display = "block"
    this.element_section_loading!.style.display = "none"
  }

  async continue() {
    this.hideWinningLoosing()
    this.toggleLoading()
    await this.loadNewGameData()
    this.endLoading()
  }

  async retry() {
    await this.continue()
    this.game_data.score = 0
  }
}
