import {
  Component,
  NgModule,
  VERSION,
  AfterViewInit,
  Input,
  OnInit,
  PipeTransform
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormControl } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from './modal-content';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { log } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _users: User[];
  selectedUser: User;
  name: string;
  family: string;
  editingIndex: number;

  constructor(private modalService: NgbModal) {
    this._users = [
      new User('Ali', 'Delshad'),
      new User('Hamid', 'Sadeghi'),
      new User('Amir', 'Olfat'),
      new User('Keyvan', 'Nasr')
    ];
  }

  get users(): User[] {
    return this._users;
  }

  delete(index: number) {
    this._users.splice(index, 1);
  }

  setEditUser(index: number): void {
    this.editingIndex = index;
    this.name = this._users[index].name;
    this.family = this._users[index].family;
    this.selectedUser = this._users[index];
  }

  edit(): void {
    this._users[this.editingIndex] = new User(this.name, this.family);
    this.editingIndex = undefined;
    this.name = '';
    this.family = '';
  }

  add(): void {
    this._users.push(new User(this.name, this.family));
    this.name = '';
    this.family = '';
  }

  open(): void {
    const modalRef = this.modalService.open(NgbdModalContent);
    if (this.selectedUser) {
      this.selectedUser['editingIndex'] = this.editingIndex;
      modalRef.componentInstance.user = this.selectedUser;
    } else {
      modalRef.componentInstance.user = new User(this.name, this.family);
    }
    modalRef.componentInstance.passEntry.subscribe(receivedEntry => {
      this.selectedUser
        ? this._users.splice(this.editingIndex, 1, receivedEntry)
        : this._users.push(receivedEntry);
    });
  }
}

export class AppModule {}

export class User {
  private _name: string;
  private _family: string;
  private _itemNum: number;
  private _birthday: LocalDate;

  constructor(
    name: string,
    family: string,
    itemNum?: number,
    birthday?: LocalDate
  ) {
    this._name = name;
    this._family = family;
  }

  get name(): string {
    return this._name;
  }

  get family(): string {
    return this._family;
  }

  get itemNum(): number {
    return this._itemNum;
  }

  get birthday(): LocalDate {
    return this._birthday;
  }
}

export interface LocalDate {
  day: number;
  month: number;
  year: number;
}

// function search(text: string, pipe: PipeTransform): Users[] {
//   return USERS.filter(country => {
//     const term = text.toLowerCase();
//     return (
//       country.name.toLowerCase().includes(term) ||
//       pipe.transform(country.area).includes(term) ||
//       pipe.transform(country.population).includes(term)
//     );
//   });
// }

// @Component({
//   selector: 'ngbd-table-filtering',
//   templateUrl: './app.component.html',
//   providers: [DecimalPipe]
// })
// export class NgbdTableFiltering {
//   users$: Observable<User[]>;
//   filter = new FormControl('');

//   constructor(pipe: DecimalPipe) {
//     this.users$ = this.filter.valueChanges.pipe(
//       startWith('')
//       // map(text => search(text, pipe))
//     );
//   }
// }
