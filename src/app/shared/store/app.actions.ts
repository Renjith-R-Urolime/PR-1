import { createAction, props } from '@ngrx/store';
import { DropdownFileStatus, DropdownItem, Permissions, subMenuLinks } from './app.state';

export const setSampleText = createAction('[App] set sample value', props<{sampleText:string}>());
export const setPermissions = createAction('[App] set permisisons', props<Permissions>());
export const setDropdownValues = createAction('[App] set dropdown', props<DropdownItem>());
export const setDropdownFileStatus = createAction('[App] Set Dropdown Status', props<DropdownFileStatus>());
export const clearDropdownValues = createAction('[App] clear dropdown', props<{ listName: string }>());
export const setMenuLinks = createAction('[App] set Menu Link', props<{link: string }>());
export const setSubMenuLinks = createAction('[App] Set SubMenu Links', props<subMenuLinks>());
