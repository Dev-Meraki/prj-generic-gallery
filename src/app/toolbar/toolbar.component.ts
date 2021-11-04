import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { MyBooksStoreService } from '../core/my-books-store.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(private myBooks: MyBooksStoreService) {}

  notifier = new Subject();
  booksBorrowed: number = 0;

  ngOnInit(): void {
    this.myBooks.$myBooks
      .pipe(
        map((data) => data.length),
        takeUntil(this.notifier)
      )
      .subscribe((data) => (this.booksBorrowed = data));
  }
}
