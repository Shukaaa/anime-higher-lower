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
    {value: 'manga', viewValue: 'Manga, Manhua, Manwha & Light Novel'},
  ]

  limit = [
    {value: 50, viewValue: '50'},
    {value: 100, viewValue: '100'},
    {value: 200, viewValue: '200'},
    {value: 500, viewValue: '500'},
    {value: 1000, viewValue: '1000'},
    {value: 5000, viewValue: '5000'},
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
