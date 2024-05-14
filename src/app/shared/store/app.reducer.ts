import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { AppState } from './app.state';

const initialState: AppState = {
    sampleText: '',
    permissions: {},
    dropdowns: {},
    dropdownFileStatus: {},
    subMenuLinks: []
}

export const appReducer = createReducer(
    initialState,
    on(AppActions.setSampleText, (state, { sampleText }) => {

        return {
            ...state,
            sampleText: sampleText
        }
    }),
    on(AppActions.setPermissions, (state, permissions) => {
        return {
            ...state,
            permissions: permissions
        }
    }),
    on(AppActions.setDropdownValues, (state, {listName, list }) => {
        const updatedDropdowns = {
            ...state.dropdowns,
            [listName]: list
        };
        return {
            ...state,
            dropdowns: updatedDropdowns
        }
    }),
    on(AppActions.clearDropdownValues, (state, { listName }) => {
        const { [listName]: _, ...updatedDropdowns } = state.dropdowns;
        return {
            ...state,
            dropdowns: updatedDropdowns
        }
    }),
    on(AppActions.setSubMenuLinks, (state, { menu, dynamicLinks }) => {
        const menuExists = state.subMenuLinks.some((item) => item.menu === menu);
        return menuExists
            ? state
            : {
                ...state,
                subMenuLinks: [...state.subMenuLinks, { menu, dynamicLinks }],
            };
    }),
    on(AppActions.setDropdownFileStatus, (state, { fileName , status }) => {
        const updatedStatus = {
          ...state.dropdownFileStatus,
          [fileName]: status,
        };
        return {
          ...state,
          jsonListStatus: updatedStatus,
        };
      }),
)
