import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Link, Text, Box } from "theme-ui";
import { getSpotifyData, Data as spotifyType } from "../pages/api/spotify";
import { BsSpotify } from "react-icons/bs";

const PROFILE = "https://open.spotify.com/user/neel.redkar"

export function SpotifyBar({
    spotifyData,
    date,
    ...props
}: {
    spotifyData: spotifyType;
    date: number;
}) {
    let [spotifyProgress, setProgress] = useState(spotifyData.progress);
    let [spotifyDataS, setSpotifyDataS] = useState(spotifyData);
    useEffect(() => {
        let intervalId = setInterval(() => {
            // Update Spotify data every 5 seconds
            fetch("/api/spotify")
                .then((res) => res.json())
                .then((d) => {
                    date = Date.now();
                    setProgress(d.progress);
                    setSpotifyDataS(d);
                    spotifyDataS = d;
                });
        }, 5000);
        let intervalId2 = setInterval(() => {
            // Update Spotify time every second
            let futureProgress = spotifyDataS.progress + (Date.now() - date)
            if (spotifyDataS.playing && !(spotifyDataS.duration <= futureProgress))
                setProgress(futureProgress);
        }, 1000);
        return () => {
            clearInterval(intervalId);
            clearInterval(intervalId2);
        };
    }, []);

    return (
        <Box sx={{
            flexDirection: "column",
            position: "fixed",
            bottom: 0,
            left: 0,
            p: 2,
            mb: 3,
            pl: 3,
            bg: spotifyDataS.duration > 0 ? "highlight" : "transparent",
            transition: "all 0.5s ease !important",
        }}>
            {spotifyDataS.duration > 0 ? (<><Text as="p">
                <Link href={PROFILE}>neelr</Link> listening on {spotifyDataS.device.name}
                {spotifyDataS.playlistName ? (
                    <span>
                        {" "}to{" "}
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href={spotifyDataS.playlistUrl}
                        >
                            {spotifyDataS.playlistName}
                        </Link>
                    </span>
                ) : (
                    ""
                )}
                :
            </Text>
                <Link
                    href={spotifyDataS.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ display: "flex", flexDirection: "column" }}
                >
                    <Box sx={{ display: "flex" }}>
                        <Image
                            src={spotifyDataS.albumArt}
                            width={40}
                            height={40}
                            alt={spotifyDataS.album}
                        />
                        <Text
                            my="auto"
                            mx="10px"
                        >{`${spotifyDataS.song}, ${spotifyDataS.artist}`}</Text>
                        <Text my="auto">{`${Math.floor(
                            spotifyProgress / 1000 / 60
                        )}:${pad(
                            Math.floor((spotifyProgress / 1000) % 60)
                        )} / ${Math.floor(spotifyDataS.duration / 1000 / 60)}:${pad(
                            Math.floor((spotifyDataS.duration / 1000) % 60)
                        )}`}</Text>
                    </Box>
                </Link></>) : <Link target="_blank" href={PROFILE} sx={{
                    fontSize: 4,
                    m: "auto",
                    display: "flex",
                }}><BsSpotify /></Link>
            }
        </Box>);
}

function pad(d: number): string {
    return d < 10 ? "0" + d.toString() : d.toString();
}