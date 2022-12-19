import { GetServerSidePropsContext } from "next";
import { Box, Link, Text } from "theme-ui";
import Sidebar from "../components/sidebar";
import { SpotifyBar } from "../components/spotifyBar";
import { getSpotifyData, Data as spotifyType } from "./api/spotify";

export default function Home({
    spotifyData,
    date,
    ...props
}: {
    spotifyData: spotifyType;
    date: number;
}) {
    return (
        <Box sx={{ display: "flex", mt: "100px", flexDirection: ["column-reverse", "row"] }}>
            <Sidebar active={1} />
            <Box
                sx={{
                    mx: "auto",
                    ml: ["auto", 3],
                    width: ["90vw", "65vw"],
                    flexDirection: "column",
                }}
            >
                <Text as="h1">Projects!</Text>
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
