import { createAction, props } from '@ngrx/store';
import { Tables } from './tables.state';

export const addTable = createAction('[Tables] Add Table',props<Tables>());
export const updatePinnedHeaders =createAction('[Tables] update pinnedHeaders', props<{tableName:string,pinnedHeaders:string[]}>());
export const pushValueToPinnedHeaders=createAction('[Tables] push value to pinned headers',props<{tableName:string,pinnedHeaders:string,value:string}>());
export const updatehideColFromTableHeader =createAction('[Tables] update pinnedHeaders', props<{tableName:string,pin:boolean[]}>());
export const updatePin =createAction('[Tables] update pinnedHeaders', props<{tableName:string,pinnedHeaders:string[],pin:boolean[],hideCol:boolean[],checkedCol:boolean[]}>());