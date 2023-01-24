import React from "react";
import type {AppProps} from 'next/app';
import {wrapper} from '@/store'
import '@/styles/Main.scss'
import Player from "@/components/Player";

const App: React.FC<AppProps> = ({Component, pageProps}) => {
    return (
        <>
            <Component {...pageProps} />
            <Player/>
        </>
    )
}

export default wrapper.withRedux(App);
