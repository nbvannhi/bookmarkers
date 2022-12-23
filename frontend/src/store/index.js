import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { isSignedIn: false },
    reducers: {
        signIn(state) {
            state.isSignedIn = true;
        },
        signOut(state) {
            state.isSignedIn = false;
        },
    }
});

export const authActions = authSlice.actions;

export const store = configureStore({
    reducer: authSlice.reducer
});
