import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import NLink from "next/link";
import { Box, Link, Text } from "theme-ui";
import Sidebar from "../components/sidebar";
import { SpotifyBar } from "../components/spotifyBar";
import { getLocation, Data as locationType } from "./api/getLocation";
import { getQuote, Data as quoteType } from "./api/quote";
import { getSpotifyData, Data as spotifyType } from "./api/spotify";
import { ReactTypical as Typer } from '@deadcoder0904/react-typical';
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const BLink = (props: any) => <Link style={{ textDecoration: "underline" }} target="_blank" {...props} />;

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
  const { scrollYProgress } = useScroll();
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest > 0.9) {
        setConfetti(true);
        return
      }
    })
  }, [scrollYProgress])
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
        <Text variant="heading">Hi, I&rsquo;m Neel<Typer steps={[".", 2000, ', ...a programmer?', 2000, ', ...a philosopher?', 1700, ', ...a founder?', 2000, ', a maker.', 1000]}
          wrapper="span" /></Text>
        <Text as="p" sx={{ fontStyle: "italic" }}>
          {quote.quote}
        </Text>
        <Text as="p" sx={{ fontStyle: "italic" }}>
          - {quote.author}
        </Text>
        <br />
        <Text as="p">Currently a senior in highschool, lover of code, and avid exclamation mark (over?) user! As a <BLink href="https://notebook.neelr.dev/tags/philosophy">philosophy nerd</BLink>, I tend to <BLink href="https://s.neelr.dev/carbnn-research-paper">research the boundaries of AI</BLink>. Though a maker at heart, I am a (self) certified generalist—<BLink href="https://concussionstorywall.org/">web dev</BLink>, <BLink href="https://sinerider.com">game dev</BLink>, <BLink href="https://tmpltr.now.sh">systems</BLink>, & <BLink href="https://notebook.neelr.dev/stories/animelstm">anime</BLink>.</Text>
        <Text as="p" mt="10px">It all started off with an invitation to <BLink href="https://cloud.google.com/blog/topics/google-cloud-next/google-cloud-next19-welcome-to-the-future-of-digital-transformation">Next19</BLink>—my first (<BLink href="https://nextjs.org/conf">not</BLink> <BLink href="https://aaai.org/Conferences/AAAI-23/">last</BLink>) conference—which taught me one of my favorite ideas, <i>&quot;don&rsquo;t let <BLink href="https://notebook.neelr.dev/stories/education">school</BLink> take away from your <BLink href="https://notebook.neelr.dev/stories/how-to-learn">eduction</BLink>&quot;</i>.</Text>
        <Text as="p" mt="10px">Interested in interacting with the &quot;real world&quot;, I became an active member of <BLink href="https://hackclub.com">HackClub</BLink> <BLink href="https://event.codeday.org/ba">organizing</BLink> <BLink href="https://dvhacks-3.devpost.com/">many</BLink> <BLink href="https://archive.vn/Q0LyP">events</BLink> (including <BLink href="https://angelhacks.org">AngelHacks</BLink> & the <BLink href="https://summer.hackclub.com">Summer of Making</BLink>). IMO i made <BLink href="https://github.com/neelr/BackFiler">some</BLink> <BLink href="https://github.com/neelr/goJSON">cool</BLink> <BLink href="https://github.com/neelr/LeishNN">projects</BLink> <BLink href="https://github.com/neelr/flappyai">too</BLink>.</Text>
        <Text as="p" mt="10px">Blasting off I gathered experiences—some <BLink href="https://roambee.com">crazy</BLink> <BLink href="https://fbk.eu">AI</BLink> <BLink href="https://teachaids.org">internships</BLink>, taking a train for a <BLink href="https://notebook.neelr.dev/stories/the-hacker-zephyr.">3,502 mile long hackathon</BLink>, and <BLink href="https://projectboard.world/isef/project/mats055---ai-developed-novel-mof-for-carbon-capture">independant research on turning CO2 into fuel</BLink>!</Text>
        <Text as="p" mt="10px">If you find any of this interesting, or just want to talk, hit me up with an email with something resembling my name [at] this domain! I&rsquo;m trying to read more, so reccomend me some books/music!</Text>
        <Text as="h2" mt="15px">Notebook Posts!</Text>
        <Box sx={{ flexWrap: "wrap", display: "flex" }}>
          {notebookFeed.map((post, i) => (
            <Box sx={{ display: "flex", flexDirection: "column", mb: 3, width: ["100%", "45%"] }} key={i}>
              <Link target={"_blank"} href={post.link}>
                <Text as="h3" sx={{ textDecoration: "underline" }}>{post.title}</Text>
                <Image src={post.image} width={320} height={180} alt={post.title} />
                <Text sx={{ color: "text" }} as="p">{`${new Date(post.pubDate).toLocaleDateString()} ${post.description}`}</Text>
                <Text sx={{ color: "text" }} as="p">{post.tags.map((tag, i) => <><BLink href={`https://notebook.neelr.dev/tags/${tag}`} key={i}>{`#${tag}`}</BLink>{i < post.tags.length - 1 ? " / " : ""}</>)}</Text>
              </Link>
            </Box>
          ))}
        </Box>
        <hr />
        <Text sx={{ fontStyle: "italic" }}>Find me at {location.city} where its {location.weather}</Text>
        {confetti && <Typer steps={['Thanks for scrolling through my site!', 1000, "Made with <3 by neelr"]} />}
        <SpotifyBar date={date} spotifyData={spotifyData} />
        <Box>
          <Image src={"/hippo.png"} width={200} height={200} alt="hippo" />
        </Box>
      </Box>
    </Box >
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
