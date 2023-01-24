import React, {useEffect} from 'react';
import MainLayout from "@/layouts/MainLayout";
import {Box, Button, Card, Container, Grid} from "@mui/material";
import {useRouter} from "next/router";
import paths from '@/utils/paths'
import TrackList from "@/components/TrackList";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {fetchTracks, selectTracksState} from "@/store/slices/trackSlice";
import Link from "next/link";

const Track = () => {
    const dispatch = useAppDispatch()
    const {tracks, isLoading} = useTypedSelector(selectTracksState)


    useEffect(() => {
        dispatch(fetchTracks())
    }, [])

    return (
        <MainLayout title={'Tracks List'}>
            <Container>
                <Grid container>
                    <Card style={{width: '100%'}}>
                        <Box p={2}>
                            <Grid container justifyContent='space-between' alignItems='center'>
                                <h1>Track list</h1>

                                <Link href={paths.actions.createTrack}>
                                    <Button>
                                        Load Track
                                    </Button>
                                </Link>
                            </Grid>
                        </Box>
                        <TrackList tracks={tracks}/>
                    </Card>
                </Grid>
            </Container>
        </MainLayout>
    );
};

export default Track;