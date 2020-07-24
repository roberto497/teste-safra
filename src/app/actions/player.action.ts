import { createAction, props } from '@ngrx/store';

enum ActionTypes {
    Update = 'PLAYER_UPD',
}

export const update = createAction(
    ActionTypes.Update,
    props<any>()
);
