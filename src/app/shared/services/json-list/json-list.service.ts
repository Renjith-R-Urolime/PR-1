import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { clearDropdownValues } from '../../store/app.actions';
import { ApiService } from '../api.service';
import { getFileName } from './json-list-mapping';

@Injectable({
  providedIn: 'root'
})
export class JsonListService {
  private updatingStatus: boolean = false;
  private requestQueue: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private store: Store, private apiService: ApiService) {}

  getDataList(field: string): Observable<any> {
    const { fileName, extractProperty, parentIdName } = getFileName(field);

    if(fileName !== undefined) {
      return this.apiService.get(`resources/file/${fileName}.json`).pipe(
        switchMap((response: any) => {
            if (extractProperty) {
              const data = response as any[];
              const flattenedData = data
                .map((item) =>
                  item[extractProperty]?.map((subItem) => ({
                    ...subItem,
                    [parentIdName]: item.id,
                  }))
                )
                .flat();
              return of(flattenedData.filter(Boolean));
            } else {
              return of(response);
            }
          })
        );
      }

      return of({})
    }
}
