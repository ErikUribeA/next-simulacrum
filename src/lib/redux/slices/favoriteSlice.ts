import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
    [key: number]: boolean;
}

const initialState: FavoritesState = {};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const itemId = action.payload;
            if (state[itemId]) {
                delete state[itemId];
            } else {
                state[itemId] = true;
            }
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;