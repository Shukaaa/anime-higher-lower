import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HighscoreStore} from "../../store/highscore.store";

@Component({
  selector: 'app-loosing',
  templateUrl: './loosing.component.html',
  styleUrls: ['../view.css']
})
export class LoosingComponent {
  @Output() retryClicked = new EventEmitter<void>();
  @Input() score: number = 0;

  constructor(private highscoreStore: HighscoreStore) {
  }

  retry() {
    this.retryClicked.emit();
  }

  async back() {
    if (this.score > await this.highscoreStore.getScore()) {
      await this.highscoreStore.setScore(this.score);
    }

    window.location.href = "/";
  }
}
