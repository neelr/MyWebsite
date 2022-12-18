import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { Box, Link, Text } from "theme-ui";
import Sidebar from "../components/sidebar";
import { SpotifyBar } from "../components/spotifyBar";
import { getLocation, Data as locationType } from "./api/getLocation";
import { getQuote, Data as quoteType } from "./api/quote";
import { getSpotifyData, Data as spotifyType } from "./api/spotify";

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
        <br />
        <Text as="p">Currently a senior in highschool, lover of code, and avid exclamation mark (over?) user! As a philosophy nerd, I tend to research the boundaries of AI, developing new models. Though a maker at heart, I am a (self) certified generalist—web dev, game dev, systems, & anime.</Text>
        <Text as="p" mt="10px">It all started off with an invitation to Next19—my first (not last) conference—which taught me one of my favorite ideas, <i>&quot;don&rsquo;t let school take away from your eduction&quot;</i>.</Text>
        <Text as="p" mt="10px">Interested in interacting with the &quot;real world&quot;, I became an active member of HackClub organizing many events (including AngelHacks & the Summer of Making).</Text>
        <Text as="p" mt="10px">Blasting off I gathered experiences—some crazy AI internships, taking a train for a 3,502 mile long hackathon, and independant research on turning CO2 into fuel!</Text>
        <Text as="p" mt="10px">If you find any of this interesting, or just want to talk, hit me up with an email with something resembling my name [at] this domain! I&rsquo;m trying to read more, so reccomend me some books/music!</Text>
        <Text as="h2" mt="15px">Notebook Posts!</Text>
        <Box sx={{ flexWrap: "wrap", display: "flex" }}>
          {notebookFeed.map((post, i) => (
            <Box sx={{ display: "flex", flexDirection: "column", mb: 3, width: ["100%", "45%"] }} key={i}>
              <Link target={"_blank"} href={post.link}><Text as="h3">{post.title}</Text></Link>
              <Image src={post.image} width={320} height={180} alt={post.title} />
              <Text as="p">{`${new Date(post.pubDate).toLocaleDateString()} ${post.description}`}</Text>
              <Text as="p">{post.tags.map((tag) => `#${tag} `)}</Text>
            </Box>
          ))}
        </Box>
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

  let notebookRSS = await fetch('https://notebook.neelr.dev/feed_first5.json');
  let notebookFeed: NotebookPost[] = (await notebookRSS.json()).splice(0, 4).map((item: any) => {
    return {
      title: item.title,
      description: item.description,
      link: item.url,
      stars: item.upvotes,
      tags: item.categories,
      pubDate: item.date,
      image: item.image
    }
  });

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
