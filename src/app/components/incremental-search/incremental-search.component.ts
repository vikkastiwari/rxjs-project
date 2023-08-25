import { Component, OnInit } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, fromEvent, map, mergeMap, switchMap, tap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'rxjs-incremental-search',
  templateUrl: './incremental-search.component.html',
  styleUrls: ['./incremental-search.component.scss']
})
export class IncrementalSearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const searchInput = document.getElementById('search') as HTMLElement;
    const result = document.getElementById('result') as HTMLElement;

    fromEvent(searchInput, 'input')
      .pipe(
        map((e:any) => e?.target?.value), // extracts the actual value enterd by user
        debounceTime(1000), // only emits when user paused for second while typing
        distinctUntilChanged(), // restricts event emission for same entered values
        tap(() => (result.innerHTML = '')), // if we dont clear this then new result was being added up in the old one
        filter((user) => !!user), // it makes sure that user name is not empty
        switchMap((user) => // it emits event from last nested observable hence we get latest values on every change
          ajax
            .getJSON(`https://api.github.com/search/users?q=${user}`)
            // in case of any error the main stream closes due to which user wont be able to search so we added catchError which will keep original stream intact
            .pipe(catchError((err) => EMPTY)) 
        ),
        map((res:any) => res.items), // we want only items from response hence discarding other data
        // now we dont want array of users coz for iteration we need event of individual user
        mergeMap((users:any) => users), // it converts the collection and array of users to individual event of users
        tap({next: e => console.log(e), error: e => console.warn(e)})
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
