import React from 'react';
import Navbar from "@/components/Navbar";
import Head from "next/head";

interface MainLayoutProps {
    children: React.ReactNode | React.ReactNode[];
    title?: string;
    description?: string;
    keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({children, title, description, keywords}) => {
    return (
        <>
            <Head>
                <title>{title || 'Music platform'}</title>
                <meta name="description"
                      content={`Музыкальная площадка. Здесь каждый может оставить свой трек и стать знаменитым.` + description}/>
                <meta name="robots" content="index, follow"/>
                <meta name="keywords" content={keywords || "Music, Tracks, Artists"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>

            <Navbar/>

            <main>
                {children}
            </main>
        </>
    );
};

export default MainLayout;