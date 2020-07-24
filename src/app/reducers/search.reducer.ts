import { createReducer, on, State } from '@ngrx/store';

import { update, clear } from '../actions/search.action';
import { SearchModel } from '../core/models/search-model';

export const search = new SearchModel();

export const reducer = createReducer(
    search,
    on(update, (state, { query, albums, total }) => ({
        ...state,
        query,
        albums: [...state.albums, ...albums],
        total
    })),
    on(clear, (state, { query }) => ({
        ...state,
        query,
        albums: [],
        total: 0
    }))
);
