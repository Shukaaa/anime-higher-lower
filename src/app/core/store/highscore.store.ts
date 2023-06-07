import {Injectable} from "@angular/core";
import axios from 'axios'
import {ClerkService} from "../service/clerk.service";
import {Highscore} from "../types/Highscore";

@Injectable()
export class HighscoreStore {
  constructor(private _clerkService: ClerkService) { }

  public async getScore(): Promise<number> {
    let highscore: number = 0;
    let user_id = await this._clerkService.user.id;

    await axios.get('http://localhost:3000/highscore/' + user_id).then((response) => {
      highscore = +response.data.score;
    }).catch(async (err) => {
      if (err.response.data.error === "Spieler nicht gefunden") {
        highscore = 0;

        let body = {
          player: user_id,
          score: String(highscore),
          username: this._clerkService.user.username
        }

        await axios.post('http://localhost:3000/highscore', body)
          .catch((err) => { console.log(err) });
      }
    });

    return highscore;
  }

  public async setScore(score: number): Promise<void> {
    console.log("setScore: " + score);

    let user_id = await this._clerkService.user.id;

    await axios.post('http://localhost:3000/highscore', {
      player: user_id,
      score: String(score),
      username: this._clerkService.user.username
    });
  }

  public async getAllScores(): Promise<any> {
    let highscores: Highscore[] = [];

    await axios.get('http://localhost:3000/highscore').then((response) => {
      highscores = response.data;
    }).catch((err) => {
      console.log(err);
    });

    return highscores;
  }
}
