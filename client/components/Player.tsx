'use client'

import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Container, Grid, IconButton} from "@mui/material";
import {Pause, PlayArrow, SkipNext, SkipPrevious, VolumeUp} from "@mui/icons-material";
import style from '@/styles/Player.module.scss'
import {ITrack} from "@/store/types/track";
import TrackProgress from "@/components/TrackProgress";
import {playerActions, selectPlayerState} from "@/store/slices/playerSlice";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import paths from "@/utils/paths";
import Image from "next/image";
import imageLoader from "@/utils/imageLoader";


let audio: HTMLAudioElement;


const Player = () => {
    const dispatch = useAppDispatch()
    const playerState = useTypedSelector(selectPlayerState)
    // const actions = useActions({...playerActions})


    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            setAudio()
            play()
        }
    }, [playerState.track])


    const setAudio = () => {
        if (playerState.track) {
            audio.src = paths.server.root + '/' + playerState.track.audio
            audio.volume = playerState.volume / 100
            audio.onloadedmetadata = () => {
                dispatch(playerActions.setDuration(Math.ceil(audio.duration)))
            }
            audio.ontimeupdate = () => {
                dispatch(playerActions.setCurrentTime(Math.ceil(audio.currentTime)))
            }
        }
    }


    const play = () => {
        console.log(playerState.pause)
        if (playerState.pause) {
            dispatch(playerActions.playTrack())
            audio.pause()
        } else {
            dispatch(playerActions.pauseTrack())
            audio.play()
        }
    }


    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        audio.currentTime = value
        dispatch(playerActions.setCurrentTime(Number(value)))
    }


    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        console.log(value)
        audio.volume = value / 100
        dispatch(playerActions.setVolume(Number(value)))
    }


    if (!playerState.track)
        return null


    return (
        <div className={style.root}>
            <Container>
                <div style={{flex: '1 1 auto'}}>
                    <TrackProgress
                        left={playerState.currentTime}
                        right={playerState.duration}
                        onChange={changeCurrentTime}
                    />
                </div>

                <Grid container alignItems="center" justifyContent="space-between" gap={2} direction='row'
                      style={{height: 60}}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: "center",
                        gap: '8px'
                    }}>

                        <IconButton>
                            <SkipPrevious sx={{fill: '#AAA', "&:hover": {fill: '#FFF'}}}/>
                        </IconButton>

                        <IconButton onClick={play}>
                            {playerState.pause
                                ? <Pause sx={{fill: '#AAA', "&:hover": {fill: '#FFF'}}}/>
                                : <PlayArrow sx={{fill: '#AAA', "&:hover": {fill: '#FFF'}}}/>
                            }
                        </IconButton>

                        <IconButton>
                            <SkipNext sx={{fill: '#AAA', "&:hover": {fill: '#FFF'}}}/>
                        </IconButton>

                        <Image
                            src={playerState.track.picture}
                            loader={imageLoader}
                            alt={playerState.track.name}
                            width={50}
                            height={50}
                            className={'cover rounded'}
                        />

                        <div className={style.description}>
                            <div className={style.name}>{playerState.track?.name}</div>
                            <div className={style.artist}>{playerState.track?.artist}</div>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "flex-start"
                    }}>
                        <VolumeUp/>

                        <TrackProgress
                            left={playerState.volume}
                            right={100}
                            onChange={changeVolume}
                        />
                    </div>
                </Grid>
            </Container>
        </div>
    );
};

export default Player;