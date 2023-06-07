import {AfterViewInit, Component, OnInit} from '@angular/core';
import { HttpClient } from "../../http/http-client";
import {GameOptions} from "../../types/GameOptions";
import {GameData} from "../../types/GameData";
import { HighscoreStore } from '../../store/highscore.store';
import {Entry} from "../../types/Entry";
import {delay} from "../../utils/utils";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css', '../view.css']
})
export class ContentComponent implements AfterViewInit, OnInit {
  options_loaded: boolean = false
  loading: boolean = false

  game_data: GameData = {
    score: 0,
    highscore: 0,
    randomEntries: []
  }

  preRandomEntries: Entry[] = []

  options: GameOptions = {
    max_top_amount: 200,
    game_type: "anime",
    game_information: {
      title: true,
      title_english: true,
      type: true,
      episodes: true
    }
  }

  element_section_game: HTMLElement | null = null
  element_section_won: HTMLElement | null = null
  element_section_loose: HTMLElement | null = null
  element_section_loading: HTMLElement | null = null

  constructor(private requests: HttpClient,
              private highscoreStore: HighscoreStore) { }

  async ngOnInit(): Promise<void> {
    this.game_data.highscore = await this.highscoreStore.getScore();
  }

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
    this.toggleLoading()
    await this.loadNewGameData()
    this.continue()
    this.endLoading()
    this.showGame()
  }

  async loadNewGameData() {
    this.game_data.randomEntries = await this.requests.getRandomEntry(this.options.game_type, this.options.max_top_amount)
  }

  async chooseAnime(i: number) {
    let chosenAnime = this.game_data.randomEntries[i == 0 ? 0 : 1]
    let secondAnime = this.game_data.randomEntries[i == 0 ? 1 : 0]

    this.element_section_game!.style.display = "none"
    if (chosenAnime.members >= secondAnime.members) {
      this.element_section_won!.style.display = "block"
      this.game_data.score++
    } else {
      this.element_section_loose!.style.display = "block"
      if (this.game_data.score > this.game_data.highscore) {
        await this.highscoreStore.setScore(this.game_data.score)
      }
    }

    await this.loadingData()
  }

  toggleLoading() {
    this.loading = true
    this.element_section_game!.style.display = "none"
    this.element_section_loading!.style.display = "block"
  }

  endLoading() {
    this.loading = false
    this.element_section_loading!.style.display = "none"
  }

  showGame() {
    this.element_section_game!.style.display = "block"
  }

  async continue() {
    this.element_section_won!.style.display = "none"
    this.element_section_loose!.style.display = "none"

    if (this.loading) {
      this.element_section_loading!.style.display = "block"
      await delay(100)
      await this.continue()
    }

    this.endLoading()
    this.showGame()
  }

  async loadingData() {
    this.toggleLoading()
    await this.loadNewGameData()
    this.endLoading()
  }

  async retry() {
    this.continue()
    this.game_data.score = 0
    this.game_data.highscore = await this.highscoreStore.getScore()
  }
}
