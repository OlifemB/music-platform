import {Action, AnyAction, combineReducers, configureStore, ThunkAction,} from '@reduxjs/toolkit';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import playerSlice from "@/store/slices/playerSlice";
import trackSlice from "@/store/slices/trackSlice";
import logger from 'redux-logger'

const combinedReducer = combineReducers({
    player: playerSlice,
    tracks: trackSlice,
});

const rootReducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
    if (action.type === HYDRATE) {
        return { //const nextState
            ...state,
            ...action.payload,
        };
    } else {
        return combinedReducer(state, action);
    }
};


const store = configureStore<any>({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(logger)
});

export const makeStore = () => store;

type Store = ReturnType<typeof makeStore>;


export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const wrapper = createWrapper(makeStore, {debug: true});
