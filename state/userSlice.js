import { createSlice } from '@reduxjs/toolkit';

const initialState = { uid: null, email: null };

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        doSetUser(state, action) {
            return action.payload;
        },
    },
});

export default slice.reducer;
export const { doSetUser } = slice.actions;

export const selectUser = (state) => state.user;
