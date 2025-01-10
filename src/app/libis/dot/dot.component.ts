import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { createFeatureSelector, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

type SearchState = {searchResultsMetaData : {info: {total: number}}};
export const selectSearchState = createFeatureSelector<SearchState>('Search');

@Component({
  selector: 'custom-dot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dot.component.html',
  styleUrl: './dot.component.scss'
})
export class DotComponent {
  searchState$: Observable<SearchState> | undefined;
  searchTotal$!: Observable<String> | undefined;

  public store = inject(Store);
  
  ngOnInit(): void {
    this.searchState$ = this.store.select(selectSearchState);
    this.searchTotal$ = this.searchState$.pipe(map(state => {
      console.log(state);  
      if (state.searchResultsMetaData) {
        return state.searchResultsMetaData.info.total.toString();
      } else {
        return "0";
      }}));    
    
    (globalThis as any).searchStore = this.searchState$;
    (globalThis as any).searchTotal = this.searchTotal$;
  }
 
}
