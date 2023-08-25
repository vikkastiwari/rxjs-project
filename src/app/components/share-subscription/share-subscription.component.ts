import { Component, OnInit } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, fromEvent, map, mergeMap, share, switchMap, tap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'rxjs-share-subscription',
  templateUrl: './share-subscription.component.html',
  styleUrls: ['./share-subscription.component.scss']
})
export class ShareSubscriptionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const searchInput = document.getElementById('search') as HTMLElement;
    const result = document.getElementById('result') as HTMLElement;
    const resultCount = document.getElementById('resultCount') as any;

    const searchInput$ = fromEvent(searchInput, 'input').pipe(
      map((e:any) => e.target.value),
      debounceTime(1000),
      distinctUntilChanged(),
      tap(() => (result.innerHTML = '')),
      filter((user) => !!user),
      switchMap((user) =>
        ajax
          .getJSON(`https://api.github.com/search/users?q=${user}`)
          .pipe(catchError(() => EMPTY))
      ),
      share()
    );

    searchInput$.pipe(map((rsp:any) => rsp.total_count)).subscribe((totalCount) => {
      resultCount.value = totalCount;
    });

    searchInput$
      .pipe(
        map((rsp:any) => rsp.items),
        mergeMap((users) => users)
      )
      .subscribe((user:any) => {
        const div = document.createElement('div');
        div.innerHTML = `
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${user.avatar_url}" alt="Card image cap" crossOrigin="anonymous">
            <div class="card-body">
              <h5 class="card-title">${user.login}</h5>
              <a href="${user.html_url}" class="btn btn-primary">GitHub profile</a>
            </div>
          </div>`;
        result.appendChild(div);
      });
  }
}
