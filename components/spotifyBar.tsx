import React, { useEffect, useRef, useState } from 'react';
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
    const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);
    const [bottomOffset, setBottomOffset] = useState<number>(20);
    const lastUpdatedAt = useRef<number>(date);
    const previousDuration = useRef<number>(spotifyData.duration);
    const currentSpotifyData = useRef<SpotifyData>(spotifyData);

    useEffect(() => {
        const transitionTimers: ReturnType<typeof setTimeout>[] = [];

        const updateSpotifyData = (data: SpotifyData) => {
            currentSpotifyData.current = data;
            setSpotifyDataS(data);
        };

        const pollSpotify = async () => {
            try {
                const response = await fetch("/api/spotify");
                if (!response.ok) return;

                const data = await response.json() as SpotifyData;
                const availabilityChanged =
                    (previousDuration.current > 0) !== (data.duration > 0);

                lastUpdatedAt.current = Date.now();
                previousDuration.current = data.duration;
                setProgress(data.progress);

                if (!availabilityChanged) {
                    updateSpotifyData(data);
                    return;
                }

                setIsVisible(false);
                setShouldAnimate(true);

                transitionTimers.push(setTimeout(() => {
                    updateSpotifyData(data);
                    setIsVisible(true);

                    transitionTimers.push(setTimeout(() => {
                        setShouldAnimate(false);
                    }, 800));
                }, 800));
            } catch {
                // Keep the last successful state during a transient network error.
            }
        };

        void pollSpotify();
        const pollInterval = setInterval(pollSpotify, 5000);
        const progressInterval = setInterval(() => {
            const data = currentSpotifyData.current;
            const futureProgress =
                data.progress + (Date.now() - lastUpdatedAt.current);

            if (data.playing && futureProgress < data.duration) {
                setProgress(futureProgress);
            }
        }, 1000);

        return () => {
            clearInterval(pollInterval);
            clearInterval(progressInterval);
            transitionTimers.forEach(clearTimeout);
        };
    }, []);

    useEffect(() => {
        const checkFooterProximity = () => {
            const footerIframe = document.querySelector('iframe[title="overengineeRING embed"]');
            if (!footerIframe) return;

            const footerRect = footerIframe.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const gap = 20;

            // Distance from bottom of viewport to top of footer iframe
            const distFromBottom = viewportHeight - footerRect.top;

            // If footer is visible, push the bar up so it sits 20px above the footer
            setBottomOffset(Math.max(20, distFromBottom + gap));
        };

        checkFooterProximity();
        window.addEventListener('scroll', checkFooterProximity);
        window.addEventListener('resize', checkFooterProximity);

        return () => {
            window.removeEventListener('scroll', checkFooterProximity);
            window.removeEventListener('resize', checkFooterProximity);
        };
    }, []);

    // Green Square Icon Component
    const IconBox = () => (
        <Link
            href={PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Neel's Spotify profile"
            sx={{
                position: 'fixed',
                bottom: `${bottomOffset}px`,
                left: '20px',
                width: '32px',
                height: '32px',
                bg: '#1DB954',
                borderRadius: '2px',
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
                bottom: `${bottomOffset}px`,
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
                <Link
                    href={PROFILE}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    neelr
                </Link>{" "}listening on {spotifyDataS.device.name}
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
                    {spotifyDataS.albumArt ? (
                        <Image
                            src={spotifyDataS.albumArt}
                            width={40}
                            height={40}
                            alt={spotifyDataS.album}
                        />
                    ) : null}
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
