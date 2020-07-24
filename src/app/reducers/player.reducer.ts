import { createReducer, on, State } from '@ngrx/store';

import { update } from '../actions/player.action';

export const player = {
    artist: null,
    music: null,
    previewUrl: null
};

export const reducer = createReducer(
    player,
    on(update, (state, payload) => ({
        ...state,
        artist: payload.artists[0].name,
        music: payload.name,
        previewUrl: payload.preview_url
    }))
);
