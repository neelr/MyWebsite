import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { Link, Text, Box } from "theme-ui";
import { Data as SpotifyData } from "../pages/api/spotify";

const PROFILE = "https://open.spotify.com/user/neel.redkar";

interface SpotifyBarProps {
    spotifyData: SpotifyData;
    date: number;
}

const limiter = (str: string, limit: number = 20): string => {
    if (str.length > limit) {
        return str.substring(0, limit) + "...";
    }
    return str;
};

function pad(d: number): string {
    return d < 10 ? "0" + d.toString() : d.toString();
}

export function SpotifyBar({
    spotifyData,
    date,
    ...props
}: SpotifyBarProps): JSX.Element {
    const [spotifyProgress, setProgress] = useState<number>(spotifyData.progress);
    const [spotifyDataS, setSpotifyDataS] = useState<SpotifyData>(spotifyData);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [isChanging, setIsChanging] = useState<boolean>(false);
    const [previousDuration, setPreviousDuration] = useState<number>(spotifyData.duration);
    const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);

    useEffect(() => {
        let intervalId = setInterval(() => {
            fetch("/api/spotify")
                .then((res) => res.json())
                .then((d: SpotifyData) => {
                    date = Date.now();
                    setProgress(d.progress);

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
    }, [previousDuration, date, spotifyDataS]);

    const handleTransition = (newData: SpotifyData): void => {
        if ((spotifyDataS.duration > 0) !== (newData.duration > 0)) {
            setIsChanging(true);
            setIsVisible(false);
            setShouldAnimate(true);

            setTimeout(() => {
                setSpotifyDataS(newData);
                setIsVisible(true);

                setTimeout(() => {
                    setIsChanging(false);
                    setShouldAnimate(false);
                }, 800);
            }, 800);
        } else {
            setSpotifyDataS(newData);
        }
    };

    // Green Square Icon Component
    const IconBox = () => (
        <Link
            href={PROFILE}
            target="_blank"
            sx={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                width: '32px',
                height: '32px',
                bg: '#1DB954',
                borderRadius: '4px',
                display: spotifyDataS.duration > 0 ? 'none' : 'block',
                transition: 'transform 0.2s ease',
                '&:hover': {
                    transform: 'scale(1.1)',
                },
                animation: shouldAnimate ? (
                    isVisible
                        ? "roll-in 0.3s ease-out forwards"
                        : "roll-out 0.3s ease-in forwards"
                ) : 'none',
                '@keyframes roll-out': {
                    '0%': {
                        transform: 'translateX(0) rotate(0deg)',
                    },
                    '100%': {
                        transform: 'translateX(-100px) rotate(-360deg)',
                    }
                },
                '@keyframes roll-in': {
                    '0%': {
                        transform: 'translateX(-100px) rotate(0deg)',
                    },
                    '100%': {
                        transform: 'translateX(0) rotate(360deg)',
                    }
                }
            }}
        />
    );

    // Main Content Component
    const ContentBox = () => (
        <Box
            sx={{
                position: 'fixed',
                bottom: '20px',
                left: '0',
                p: 2,
                pl: 3,
                pr: 3,
                bg: 'highlight',
                visibility: spotifyDataS.duration > 0 ? 'visible' : 'hidden',
                animation: shouldAnimate && spotifyDataS.duration > 0
                    ? (isVisible ? 'slide-in 0.8s ease-in-out forwards' : 'slide-out 0.8s ease-in-out forwards')
                    : 'none',
                transform: !shouldAnimate && spotifyDataS.duration > 0 ? 'translateX(0)' : undefined,
                '@keyframes slide-in': {
                    '0%': {
                        transform: 'translateX(-100%)',
                    },
                    '100%': {
                        transform: 'translateX(0)',
                    }
                },
                '@keyframes slide-out': {
                    '0%': {
                        transform: 'translateX(0)',
                    },
                    '100%': {
                        transform: 'translateX(-100%)',
                    }
                },
                borderRadius: '0 8px 8px 0'
            }}
        >
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
        </Box>
    );

    return (
        <>
            <IconBox />
            <ContentBox />
        </>
    );
}