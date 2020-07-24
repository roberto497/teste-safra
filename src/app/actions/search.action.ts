import { createAction, props } from '@ngrx/store';

import { SearchModel } from '../core/models/search-model';

enum ActionTypes {
    Update = 'SEARCH_UPD',
    Clear = 'SEARCH_CLE',
}

export const update = createAction(
    ActionTypes.Update,
    props<SearchModel>()
);

export const clear = createAction(
    ActionTypes.Clear,
    props<{ query: string }>()
);

/*export const Update = (data: any) => {
    return { type: ActionTypes.Update, payload: data } as Action;
};

export const Clear = () => {
    return { type: ActionTypes.Clear, payload: [] } as Action;
};*/
