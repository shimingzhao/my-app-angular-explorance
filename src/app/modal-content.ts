import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from './app.component';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './modal-content.html'
})
export class NgbdModalContent implements OnInit {
  @Input() user: User;
  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit() {}
}
