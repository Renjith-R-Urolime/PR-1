import { createReducer, on } from '@ngrx/store';
import { addTable, pushValueToPinnedHeaders, updatePin, updatePinnedHeaders, updatehideColFromTableHeader } from './tables.actions';
import { TableSate } from './tables.state';

const initialState:TableSate={
    tables:[]
}

export const tablesReducer= createReducer(
    initialState,
    on(updatehideColFromTableHeader, (state, { tableName, pin }) => ({
      ...state,
      tables: state.tables.map(table =>{

        return  table.tableName === tableName ? { ...table, pin, pinnedHeaders:table.pinnedHeaders } : table
      })
    })),

    on(addTable, (state, { tableName, pinnedHeaders,pin,hideCol,checkedCol }) => ({ ...state, tables: [...state.tables, { tableName, pinnedHeaders,pin,hideCol,checkedCol }] })),

    on(updatePinnedHeaders, (state, { tableName, pinnedHeaders }) => ({
        ...state,
        tables: state.tables.map(table => {


          return table.tableName === tableName ? { ...table, pinnedHeaders,pin:table.pin } : table})
      })),

      on(pushValueToPinnedHeaders, (state, { tableName, pinnedHeaders, value }) => ({
        ...state,
        tables: state.tables.map(table =>
          table.tableName === tableName ? { ...table, [pinnedHeaders]: [...table[pinnedHeaders], value] } : table
        )
      })),
      on(updatePin, (state, { tableName, pinnedHeaders,pin,hideCol,checkedCol }) => ({
        ...state,
        tables: state.tables.map(table =>{

          return  table.tableName === tableName ? { ...table, pinnedHeaders,pin,hideCol,checkedCol } : table
        })
      })),

)