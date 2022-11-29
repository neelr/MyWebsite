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
        <Text variant="heading">Hi, I&rsquo;m Neel.</Text>
        <Text as="p" sx={{ fontStyle: "italic" }}>
          {quote.quote}
        </Text>
        <Text as="p" sx={{ fontStyle: "italic" }}>
          - {quote.author}
        </Text>
        <hr />
        <Text sx={{ fontStyle: "italic" }}>Find me at {location.city} where its {location.weather}</Text>
        <SpotifyBar date={date} spotifyData={spotifyData} />
        <Box>
          <Image src={"/hippo.png"} width={200} height={200} alt="hippo" />
        </Box>
      </Box>
    </Box>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  let quote = await getQuote();
  let spotifyData = await getSpotifyData();
  console.log(spotifyData)
  let location = await getLocation();
  return {
    props: {
      quote,
      spotifyData,
      location,
      date: Date.now(),
    },
  };
}
