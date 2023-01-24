import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITrack} from "@/store/types/track";
import {RootState} from "@/store";


export interface PlayerState {
    track: null | ITrack;
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
}

const initialState: PlayerState = {
    track: null,
    volume: 100,
    duration: 0,
    currentTime: 0,
    pause: true,
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        pauseTrack(state) {
            state.pause = true
        },
        playTrack(state) {
            state.pause = false
        },
        setCurrentTime(state, action) {
            state.currentTime = action.payload
        },
        setVolume(state, action) {
            state.volume = action.payload
        },
        setDuration(state, action) {
            state.duration = action.payload
        },
        setTrack(state, action) {
            state.track = action.payload
        },
    }
})
console.log(playerSlice)

//{pauseTrack, playTrack, setCurrentTime, setVolume, setDuration, setTrack}
export const playerActions = playerSlice.actions
export const selectPlayerState = (state: RootState) => state.player
export default playerSlice.reducer