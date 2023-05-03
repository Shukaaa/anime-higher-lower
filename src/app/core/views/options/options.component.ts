import { Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {GameOptions} from "../../types/GameOptions";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['../view.css']
})
export class OptionsComponent {
  @Output() startClicked = new EventEmitter<GameOptions>();

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
    limit: new FormControl(200),
  });

  start() {
    this.startClicked.emit({
      type: this.options.controls.types.value as "anime" | "manga",
      max_top_amount: this.options.controls.limit.value as number
    });
  }
}
