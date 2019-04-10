import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from './app.component';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './modal-content.html'
})
export class NgbdModalContent implements OnInit {
  @Input() user: User;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit() {
    console.log(this.user);
  }
  passBack(): void {
    this.passEntry.emit(this.user);
  }
}
