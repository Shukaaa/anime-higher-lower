import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {GameOptions} from "../../types/GameOptions";
import {HighscoreStore} from "../../store/highscore.store";
import {Highscore} from "../../types/Highscore";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['../view.css']
})
export class OptionsComponent implements OnInit {
  @Output() startClicked = new EventEmitter<GameOptions>();
  highscores: Highscore[] = [];

  constructor(private _highscoreStore: HighscoreStore) {
  }

  async ngOnInit() {
    await this._highscoreStore.getAllScores().then((highscores) => {
      this.highscores = highscores;
    });

    // sort highscores by score
    this.highscores = this.highscores.sort((a, b) => {
      return +b.score - +a.score;
    });

    // limit highscores to 10
    this.highscores = this.highscores.slice(0, 10);
  }

  types = [
    {value: 'anime', viewValue: 'Anime'},
    {value: 'manga', viewValue: 'Manga'},
  ]

  limit = [
    {value: 50, viewValue: 'Very Easy (50)'},
    {value: 100, viewValue: 'Easy (100)'},
    {value: 250, viewValue: 'Medium (250)'},
    {value: 500, viewValue: 'Hard (500)'},
    {value: 1000, viewValue: 'Very Hard (1000)'},
    {value: 5000, viewValue: 'Extreme (5000)'},
  ]

  options = new FormGroup({
    types: new FormControl("anime"),
    limit: new FormControl(250),
    title: new FormControl(true),
    title_english: new FormControl(true),
    type: new FormControl(true),
    episodes: new FormControl(true),
  });

  start() {
    this.startClicked.emit({
      game_type: this.options.controls.types.value as "anime" | "manga",
      max_top_amount: this.options.controls.limit.value as number,
      game_information: {
        title: this.options.controls.title.value as boolean,
        title_english: this.options.controls.title_english.value as boolean,
        type: this.options.controls.type.value as boolean,
        episodes: this.options.controls.episodes.value as boolean
      }
    });
  }
}
