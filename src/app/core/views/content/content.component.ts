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
  options_loaded = false;
  loading = false;

  showGameSection = false;
  showWinningSection = false;
  showLoosingSection = false;

  game_data: GameData = {
    score: 0,
    randomEntries: []
  };

  options: GameOptions = {
    max_top_amount: 200,
    game_type: "anime",
    game_information: {
      title: true,
      title_english: true,
      type: true,
      episodes: true
    }
  };

  constructor(private requests: HttpClient) { }

  async ngAfterViewInit(): Promise<void> {}

  async start(options: GameOptions) {
    this.options = options;
    this.options_loaded = true;
    this.toggleLoading();
    await this.loadNewGameData();
    this.endLoading();
    await this.continue();
  }

  async loadNewGameData() {
    this.game_data.randomEntries = await this.requests.getRandomEntry(this.options.game_type, this.options.max_top_amount);
  }

  async chooseAnime(i: number) {
    const chosenAnime = this.game_data.randomEntries[i === 0 ? 0 : 1];
    const secondAnime = this.game_data.randomEntries[i === 0 ? 1 : 0];

    this.showGameSection = false;

    if (chosenAnime.members >= secondAnime.members) {
      this.showWinningSection = true;
      this.game_data.score++;
      await this.loadingData();
    } else {
      this.showLoosingSection = true;
    }
  }

  toggleLoading() {
    this.loading = true;
    this.showGameSection = false;
  }

  endLoading() {
    this.loading = false;
  }

  showGame() {
    this.showGameSection = true;
  }

  async continue() {
    this.showWinningSection = false;
    this.showLoosingSection = false;
    this.showGame();
  }

  async loadingData() {
    this.toggleLoading();
    await this.loadNewGameData();
    this.endLoading();
  }

  async retry() {
    this.game_data.score = 0;
    this.toggleLoading();
    this.showLoosingSection = false;
    await this.loadNewGameData();
    this.endLoading();
    await this.continue();
  }
}
