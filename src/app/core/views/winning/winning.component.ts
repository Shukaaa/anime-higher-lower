import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-winning',
  templateUrl: './winning.component.html',
  styleUrls: ['../view.css']
})
export class WinningComponent {
  @Output() continueClicked = new EventEmitter<void>();

  continue() {
    this.continueClicked.emit();
  }
}
