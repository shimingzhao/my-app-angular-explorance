import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from './app.component';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './modal-content.html',
  styleUrls: ['./modal-content.css']
})
export class NgbdModalContent implements OnInit {
  @Input() user: User;
  @ViewChild('username') username: ElementRef;
  @ViewChild('userfamily') userfamily: ElementRef;
  @ViewChild('useritemnum') useritemnum: ElementRef;
  @ViewChild('userbirthday') userbirthday: ElementRef;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit() {
    console.log('user', this.user);
  }
  passBack(): void {
    let newUser = new User(
      this.username.nativeElement.value,
      this.userfamily.nativeElement.value
    );
    newUser['_itemNum'] = this.useritemnum.nativeElement.value;
    newUser['_birthday'] = this.userbirthday.nativeElement.value;
    this.passEntry.emit(newUser);
  }
}
