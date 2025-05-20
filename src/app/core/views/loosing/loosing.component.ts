import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-loosing',
  templateUrl: './loosing.component.html',
  styleUrls: ['../view.css']
})
export class LoosingComponent {
  @Output() retryClicked = new EventEmitter<void>();
  @Input() score: number = 0;

  retry() {
    this.retryClicked.emit();
  }

  async back() {
    window.location.href = "/";
  }
}
