import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { Box, Link, Text } from "theme-ui";
import Sidebar from "../components/sidebar";
import { SpotifyBar } from "../components/spotifyBar";
import { getLocation, Data as locationType } from "./api/getLocation";
import { getQuote, Data as quoteType } from "./api/quote";
import { getSpotifyData, Data as spotifyType } from "./api/spotify";
import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: ['stars:count', 'media:content'],
  }
});

let notebookFeed: NotebookPost[];

(async () => {
  let notebookRSS = await parser.parseURL('https://notebook.neelr.dev/feed.rss');
  notebookFeed = notebookRSS.items.slice(0, 5).map((item: any) => {
    return {
      title: item.title,
      description: item.contentSnippet,
      link: item.link,
      stars: item["stars:count"],
      tags: item.categories,
      pubDate: item.pubDate,
      image: item["media:content"]["$"].url
    }
  });
})();

type NotebookPost = {
  title: string;
  description: string;
  pubDate: string;
  link: string;
  stars: number;
  tags: string[];
  image: string;
}

export default function Home({
  quote,
  spotifyData,
  notebookFeed,
  location,
  date,
  ...props
}: {
  quote: quoteType;
  spotifyData: spotifyType;
  notebookFeed: NotebookPost[];
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
        <Text as="h1">Notebook Posts!</Text>
        {notebookFeed.map((post, i) => (
          <Box sx={{ display: "flex", flexDirection: "column", mb: 3 }} key={i}>
            <Link target={"_blank"} href={post.link}><Text as="h2">{post.title}</Text></Link>
            <Text as="p">{`${new Date(post.pubDate).toLocaleDateString()} ${post.description}`}</Text>
            <Text as="p">{post.stars}</Text>
            <Text as="p">{post.tags.map((tag) => `#${tag} `)}</Text>
            <Image src={post.image} width={320} height={180} alt={post.title} />
          </Box>
        ))}
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
  let location = await getLocation();

  return {
    props: {
      quote,
      spotifyData,
      location,
      date: Date.now(),
      notebookFeed,
    },
  };
}
