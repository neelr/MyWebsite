import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { Link, Text, Box } from "theme-ui";
import { BsSpotify } from "react-icons/bs";

const PROFILE = "https://open.spotify.com/user/neel.redkar";

const limiter = (str: string, limit = 20) => {
    if (str.length > limit) {
        return str.substring(0, limit) + "...";
    }
    return str;
};

function pad(d: number) {
    return d < 10 ? "0" + d.toString() : d.toString();
}

export function SpotifyBar({
    spotifyData,
    date,
    ...props
}: any) {
    const [spotifyProgress, setProgress] = useState(spotifyData.progress);
    const [spotifyDataS, setSpotifyDataS] = useState(spotifyData);
    const [isVisible, setIsVisible] = useState(true);
    const [isChanging, setIsChanging] = useState(false);
    const [previousDuration, setPreviousDuration] = useState(spotifyData.duration);

    useEffect(() => {
        let intervalId = setInterval(() => {
            fetch("/api/spotify")
                .then((res) => res.json())
                .then((d) => {
                    date = Date.now();
                    setProgress(d.progress);

                    // Handle transition when duration status changes
                    if ((previousDuration > 0) !== (d.duration > 0)) {
                        handleTransition(d);
                    } else {
                        setSpotifyDataS(d);
                    }
                    setPreviousDuration(d.duration);
                });
        }, 5000);

        let intervalId2 = setInterval(() => {
            let futureProgress = spotifyDataS.progress + (Date.now() - date);
            if (spotifyDataS.playing && !(spotifyDataS.duration <= futureProgress)) {
                setProgress(futureProgress);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
            clearInterval(intervalId2);
        };
    }, [previousDuration]);

    const handleTransition = (newData) => {
        setIsChanging(true);
        setIsVisible(false);

        // Wait for slide-out animation to complete before changing content
        setTimeout(() => {
            setSpotifyDataS(newData);
            setIsVisible(true);

            // Reset changing state after animations complete
            setTimeout(() => {
                setIsChanging(false);
            }, 300);
        }, 300);
    };

    return (
        <Box
            sx={{
                flexDirection: "column",
                position: "fixed",
                bottom: 0,
                left: 0,
                p: 2,
                mb: 3,
                pl: 3,
                bg: spotifyDataS.duration > 0 ? "highlight" : "transparent",
                transform: `translateX(${isVisible ? '0' : '-100%'})`,
                transition: "all 0.3s ease-in-out",
            }}
        >
            {spotifyDataS.duration > 0 ? (
                <>
                    <Text as="p">
                        <Link href={PROFILE}>neelr</Link> listening on {spotifyDataS.device.name}
                        {spotifyDataS.playlistName ? (
                            <span>
                                {" "}to{" "}
                                <Link
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={spotifyDataS.playlistUrl}
                                >
                                    {limiter(spotifyDataS.playlistName)}
                                </Link>
                            </span>
                        ) : ""}:
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
                            >
                                {`${limiter(spotifyDataS.song)}, ${limiter(spotifyDataS.artist)}`}
                            </Text>
                            <Text my="auto">
                                {`${Math.floor(spotifyProgress / 1000 / 60)}:${pad(Math.floor((spotifyProgress / 1000) % 60))} / ${Math.floor(spotifyDataS.duration / 1000 / 60)}:${pad(Math.floor((spotifyDataS.duration / 1000) % 60))}`}
                            </Text>
                        </Box>
                    </Link>
                </>
            ) : (
                <Link
                    target="_blank"
                    href={PROFILE}
                    sx={{
                        fontSize: 4,
                        m: "auto",
                        display: "flex",
                    }}
                >
                    <BsSpotify />
                </Link>
            )}
        </Box>
    );
}