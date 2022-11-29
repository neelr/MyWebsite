import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Box, Link, Text } from "theme-ui";
import Sidebar from "../components/sidebar";
import { SpotifyBar } from "../components/spotifyBar";
import styles from "../styles/Home.module.css";
import { getLocation, Data as locationType } from "./api/getLocation";
import { getQuote, Data as quoteType } from "./api/quote";
import { getSpotifyData, Data as spotifyType } from "./api/spotify";

export default function Home({
    quote,
    spotifyData,
    location,
    date,
    ...props
}: {
    quote: quoteType;
    spotifyData: spotifyType;
    location: locationType;
    date: number;
}) {
    return (
        <Box sx={{ display: "flex", mt: "100px", flexDirection: ["column-reverse", "row"] }}>
            <Sidebar active={0} />
            <Box
                sx={{
                    mx: "auto",
                    ml: ["auto", 3],
                    width: ["90vw", "65vw"],
                    flexDirection: "column",
                }}
            >
                <Text variant="h1">oops i don&rsquo;t have that page...</Text>
                <SpotifyBar spotifyData={spotifyData} date={date} />
            </Box>
        </Box>
    );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    let spotifyData = await getSpotifyData();
    return {
        props: {
            spotifyData,
            date: Date.now(),
        },
    };
}

function pad(d: number): string {
    return d < 10 ? "0" + d.toString() : d.toString();
}
