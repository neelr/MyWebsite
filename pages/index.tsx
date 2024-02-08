import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { Box, Link, Text, Image as I } from "theme-ui";
import Sidebar from "../components/sidebar";
import { SpotifyBar } from "../components/spotifyBar";
import { getLocation, Data as locationType } from "./api/getLocation";
import { getQuote, Data as quoteType } from "./api/quote";
import { getSpotifyData, Data as spotifyType } from "./api/spotify";
import { ReactTypical as Typer } from '@deadcoder0904/react-typical';
import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const BLink = (props: any) => <Link style={{ textDecoration: "underline" }} sx={{ ":visited": { ":hover": { color: "grayDark" }, color: "gray" } }} target="_blank" {...props} />;

type GithubRecentCommitData = {
  sha: string;
  message: string;
  date: string;
  url: string;
  repo: string;
}

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
  githubRecent,
  notebookFeed,
  location,
  date,
  ...props
}: {
  quote: quoteType;
  spotifyData: spotifyType;
  githubRecent: GithubRecentCommitData;
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
    <Box sx={{ display: "flex", mt: ["0px", "100px"], flexDirection: ["column", "row"] }}>
      <Sidebar active={0} />
      <Box
        sx={{
          mx: "auto",
          ml: ["auto", 3],
          width: ["90vw", "65vw"],
          flexDirection: "column",
        }}
      >
        <Text as="h3">Hi, I&rsquo;m Neel<Typer steps={[".", 2000, ', ...a programmer?', 2000, ', ...a philosopher?', 1700, ', ...a founder?', 2000, ', a maker.', 1000]}
          wrapper="span" /></Text>
        <Text as="p" sx={{ fontStyle: "italic" }}>
          {quote.quote}
        </Text>
        <Text as="p" sx={{ fontStyle: "italic" }}>
          - {quote.author}
        </Text>
        <br />
        <Text as="p" sx={{ fontStyle: "italic" }}>some cool things i&apos;ve done:</Text>
        <Text as="ul">
          <Text as="li">One of the youngest people to present <BLink href="https://x.com/_neelr_/status/1723092152685854909?s=20">completely independent research @ NeurIPS</BLink> (also with an <BLink href="https://marginalrevolution.com/marginalrevolution/2024/01/emergent-ventures-31st-cohort.html">EV Grant</BLink>)</Text>
          <Text as="li">Got <BLink href="https://www.davidsongifted.org/gifted-programs/fellows-scholarship/fellows/current-and-past-fellows/2023-fellows/2023-davidson-fellow-neel-redkar/">a $25k scholarship for creating new AI algorithms</BLink> to make artificial photosynthesis & carbon capture a reality (<BLink href="https://s.neelr.dev/carbnn-research-paper">presented @ AAAI23</BLink>)</Text>
          <Text as="li">Raised $80k+ <BLink href="https://dvhacks-iii.devpost.com/">for</BLink> <BLink href="https://angelhacks.org">various</BLink> <BLink href="https://summer.hackclub.com">hackathons</BLink> while also raising capital (& developing) for a <BLink href="https://nujjet.vercel.app">startup new approach to neuromodulation</BLink></Text>
          <Text as="li">(for math nerds I also was the lead dev at the start for <BLink href="https://sinerider.hackclub.dev">sinerider, a game supported by 3Blue1Brown, my fav</BLink>)</Text>
          <Text as="li">Now the youngest intern @ Notion (AI)!</Text>
        </Text>
        <br />
        <Text as="p">Currently a freshman at UCLA, lover of code, and avid exclamation mark (over?) user! As a <BLink href="https://notebook.neelr.dev/tags/philosophy">philosophy nerd</BLink>, I tend to <BLink href="https://s.neelr.dev/carbnn-research-paper">research the boundaries of AI</BLink>. Though a maker at heart, I am a (self) certified generalist—<BLink href="https://concussionstorywall.org/">web dev</BLink>, <BLink href="https://sinerider.com">game dev</BLink>, <BLink href="https://tmpltr.now.sh">systems</BLink>, & <BLink href="https://notebook.neelr.dev/stories/animelstm">anime</BLink>.</Text>
        <Text as="p" mt="10px">It all started with an invitation to <BLink href="https://cloud.google.com/blog/topics/google-cloud-next/google-cloud-next19-welcome-to-the-future-of-digital-transformation">Next19</BLink>—my first (<BLink href="https://nextjs.org/conf">not</BLink> <BLink href="https://aaai.org/Conferences/AAAI-23/">last</BLink>) conference—which taught me one of my favorite ideas, <i>&quot;don&rsquo;t let <BLink href="https://notebook.neelr.dev/stories/education">school</BLink> take away from your <BLink href="https://notebook.neelr.dev/stories/how-to-learn">education</BLink>&quot;</i>.</Text>
        <Text as="p" mt="10px">Interested in interacting with the &quot;real world&quot;, I became an active member of <BLink href="https://hackclub.com">HackClub</BLink>, <BLink href="https://event.codeday.org/ba">organizing</BLink> <BLink href="https://dvhacks-3.devpost.com/">many</BLink> <BLink href="https://archive.vn/Q0LyP">events</BLink> (including <BLink href="https://angelhacks.org">AngelHacks</BLink> & the <BLink href="https://summer.hackclub.com">Summer of Making</BLink>). IMO I made <BLink href="https://github.com/neelr/BackFiler">some</BLink> <BLink href="https://github.com/neelr/goJSON">cool</BLink> <BLink href="https://github.com/neelr/LeishNN">projects</BLink> <BLink href="https://github.com/neelr/flappyai">too</BLink>.</Text>
        <Text as="p" mt="10px">Blasting off I gathered experiences—some <BLink href="https://roambee.com">crazy</BLink> <BLink href="https://fbk.eu">AI</BLink> <BLink href="https://teachaids.org">internships</BLink>, took part in <BLink href="https://notebook.neelr.dev/stories/the-hacker-zephyr.">the worlds longest (3,502 mile-long) hackathon</BLink>, and <BLink href="https://github.com/neelr/clamp">independent research on turning CO2 into fuel @ NeurIPS</BLink>! I even created <BLink href="https://nujjet.vercel.app/">my first startup</BLink> where we <BLink href="https://www.conradchallenge.org/2021-summit-awards#block-6efb5b1ca96f674c86ca">got funding</BLink>!</Text>
        <Text as="p" mt="10px">If you find any of this interesting, or just want to talk, hit me up with an email with something resembling my name [at] this domain! I&rsquo;m trying to read more, so recommend me some books/music!</Text>
        <Text as="p" mt="10px">Most recently caught &quot;{githubRecent.message}&quot;-ing @ <BLink href={githubRecent.url}>{githubRecent.repo}</BLink></Text>
        <Text as="h2" mt="15px">Notebook Posts!</Text>
        <Box sx={{ flexWrap: "wrap", display: "flex" }}>
          {notebookFeed.map((post, i) => (
            <Box sx={{ display: "flex", flexDirection: "column", mb: 3, width: ["100%", "45%"], px: "2%" }} key={i}>
              <Link target={"_blank"} href={post.link}>
                <Text as="h3" sx={{ textDecoration: "underline" }}>{post.title}</Text>
                <I src={post.image} width={320} alt={post.title} />
                <Text sx={{ color: "text" }} as="p">{`${new Date(post.pubDate).toLocaleDateString()} ${post.description}`}</Text>
                <Text sx={{ color: "text" }} as="p">{post.tags.map((tag, i) => <span key={i}><BLink href={`https://notebook.neelr.dev/tags/${tag}`}>{`#${tag}`}</BLink>{i < post.tags.length - 1 ? " / " : ""}</span>)}</Text>
              </Link>
            </Box>
          ))}
        </Box>
        <hr />
        <Text sx={{ fontStyle: "italic" }}>Find me at {location.city} where its {location.weather}</Text>
        <Text as="p"><BLink href={"https://github.com/neelr/MyWebsite"}>Source</BLink> | <BLink href={"https://neelr.netlify.app/"}>v1</BLink></Text>
        {confetti && <Typer steps={['—Thanks for scrolling through my site!', 1000, "—Made with <3 by neelr"]} />}
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
  let github = await fetch('https://api.github.com/users/neelr/events/public?per_page=1');
  let githubData = await github.json();
  let githubRecent: GithubRecentCommitData;
  try {
    githubRecent = {
      repo: githubData[0].repo.name,
      // clean url for ui
      url: githubData[0].repo.url.replace("https://api.github.com/repos/", "https://github.com/"),
      message: githubData[0].payload.commits[0].message,
      date: githubData[0].created_at,
      sha: githubData[0].payload.commits[0].sha,
    }
  }
  catch {
    // fallback 
    githubRecent = {
      repo: "neelr/MyWebsite",
      url: "https://github.com/neelr/MyWebsite",
      message: "test",
      date: "",
      sha: ""
    }
  }

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
      githubRecent
    },
  };
}
