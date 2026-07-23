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

const BLink = (props: any) => (
  <Link
    style={{ textDecoration: "underline" }}
    sx={{ ":visited": { ":hover": { color: "grayDark" }, color: "gray" } }}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  />
);

const formatNotebookDate = (pubDate: string): string =>
  new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles" }).format(
    new Date(pubDate)
  );

type GithubRecentCommitData = {
  sha: string;
  message: string;
  date: string;
  url: string;
  repo: string;
}

type GithubPushEvent = {
  type: string;
  created_at: string;
  repo?: {
    name?: string;
  };
  payload?: {
    head?: string;
  };
}

type GithubCommitResponse = {
  sha?: string;
  commit?: {
    message?: string;
    author?: {
      date?: string;
    };
  };
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

const githubFallback: GithubRecentCommitData = {
  repo: "neelr/MyWebsite",
  url: "https://github.com/neelr/MyWebsite",
  message: "No recent public commits found",
  date: "",
  sha: ""
};

const githubHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2026-03-10",
  "User-Agent": "neelr.dev",
};

const getGithubRecentCommit = async (): Promise<GithubRecentCommitData> => {
  try {
    const eventsResponse = await fetch(
      "https://api.github.com/users/neelr/events/public?per_page=30",
      { headers: githubHeaders }
    );
    if (!eventsResponse.ok) return githubFallback;

    const events = await eventsResponse.json() as GithubPushEvent[];
    const pushEvent = Array.isArray(events)
      ? events.find(
        (event) =>
          event.type === "PushEvent" &&
          event.repo?.name &&
          event.payload?.head
      )
      : undefined;

    const repo = pushEvent?.repo?.name;
    const head = pushEvent?.payload?.head;
    if (!pushEvent || !repo || !head) return githubFallback;

    const commitResponse = await fetch(
      `https://api.github.com/repos/${repo}/commits/${head}`,
      { headers: githubHeaders }
    );
    if (!commitResponse.ok) return githubFallback;

    const commit = await commitResponse.json() as GithubCommitResponse;
    const message = commit.commit?.message?.split("\n")[0]?.trim();
    if (!message) return githubFallback;

    return {
      repo,
      url: `https://github.com/${repo}`,
      message,
      date: commit.commit?.author?.date ?? pushEvent.created_at,
      sha: commit.sha ?? head,
    };
  } catch {
    return githubFallback;
  }
};

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

  // Add global message handler for favicon updates
  useEffect(() => {
    const STEPS = 32;
    let step = 0;
    let animationComplete = false;

    // Create the event listener function
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'canvasUpdate') {
        // Always update favicon
        const favicon = document.querySelector("link[rel='icon']");
        if (favicon) {
          favicon.setAttribute('href', event.data.dataURL);
        }

        // Only update title if animation isn't complete
        if (!animationComplete) {
          const frames = ['.', '..', '...'];
          if (step >= STEPS - 1) {
            document.title = "@neelr";
            animationComplete = true;
          } else {
            document.title = frames[step % frames.length];
            step++;
          }
        }
      }
    };

    // Add event listener
    window.addEventListener('message', handleMessage);

    // Clean up on component unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest > 0.9) {
        setConfetti(true);
        return
      }
    })
  }, [scrollYProgress])

  return (
    <>
      {/* Hidden iframe at the top of the component for early loading and favicon updates */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: '1px',
        height: '1px',
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: -1
      }}>
        <iframe
          src="https://web-dit.vercel.app/embed.html"
          width={10}
          height={10}
          frameBorder={0}
          title="Hidden hippo canvas for favicon updates"
        />
      </div>

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
          <Text as="h3">Hi, I&rsquo;m Neel<Typer steps={[".", 2000, ', ...a programmer?', 2000, ', ...a philosopher?', 1700, ', ...a researcher?', 2000, ', a maker.', 1000]}
            wrapper="span" /></Text>
          <Text as="p" sx={{ fontStyle: "italic" }}>
            {quote.quote}
          </Text>
          <Text as="p" sx={{ fontStyle: "italic" }}>
            - {quote.author}
          </Text>
          <br />
          <Text>Currently dropped out in SF and doing AI research @ <BLink href="https://si.inc">standard intelligence</BLink>! I write <BLink href="https://notebook.neelr.dev/subscribe">blogs and have a newsletter</BLink> too.</Text>
          <Text as="p" sx={{ fontStyle: "italic" }}>some cool things i&apos;ve done:</Text>
          <Text as="ul">
            <Text as="li">At 18 presented <BLink href="https://x.com/_neelr_/status/1723092152685854909?s=20">a completely independent research paper @ NeurIPS</BLink> as one of the youngest researchers (funded by <BLink href="https://marginalrevolution.com/marginalrevolution/2024/01/emergent-ventures-31st-cohort.html">an EV Grant</BLink>)</Text>
            <Text as="li">Got <BLink href="https://www.davidsongifted.org/gifted-programs/fellows-scholarship/fellows/current-and-past-fellows/2023-fellows/2023-davidson-fellow-neel-redkar/">a $25k scholarship for creating new AI algorithms</BLink> to make artificial photosynthesis & carbon capture a reality (<BLink href="https://s.neelr.dev/carbnn-research-paper">presented @ AAAI23</BLink>)</Text>
            <Text as="li">Raised $80k+ <BLink href="https://dvhacks-iii.devpost.com/">for</BLink> <BLink href="https://angelhacks.org">various</BLink> <BLink href="https://summer.hackclub.com">hackathons</BLink> while also founding & raising for <BLink href="https://nujjet.vercel.app">a startup using RL for a new approach to neuromodulation</BLink></Text>
            <Text as="li">(for math nerds I also was the lead dev at the start for <BLink href="https://sinerider.hackclub.dev">sinerider, a game supported by 3Blue1Brown, my fav</BLink>)</Text>
            <Text as="li">Was the youngest intern at Notion AI!</Text>
          </Text>
          <br />
          <Text as="p">I love to make cool things and create—my research helps bring this to reality! As a <BLink href="https://notebook.neelr.dev/tags/philosophy">philosophy nerd</BLink>, I tend to mix concepts and <BLink href="https://s.neelr.dev/carbnn-research-paper">research the boundaries of AI</BLink>. Though a maker at heart, I am a (self) certified generalist—<BLink href="https://concussionstorywall.org/">web dev</BLink>, <BLink href="https://sinerider.com">game dev</BLink>, <BLink href="https://tmpltr.now.sh">systems</BLink>, & <BLink href="https://notebook.neelr.dev/stories/animelstm">anime</BLink>.</Text>
          <Text as="p" mt="10px">It all started with an invitation to <BLink href="https://cloud.google.com/blog/topics/google-cloud-next/google-cloud-next19-welcome-to-the-future-of-digital-transformation">Next19</BLink>—my first (<BLink href="https://nextjs.org/conf">not</BLink> <BLink href="https://aaai.org/Conferences/AAAI-23/">last</BLink>) conference—which taught me one of my favorite ideas, <i>&quot;don&rsquo;t let <BLink href="https://notebook.neelr.dev/stories/education">school</BLink> take away from your <BLink href="https://notebook.neelr.dev/stories/how-to-learn">education</BLink>&quot;</i>.</Text>
          <Text as="p" mt="10px">Interested in interacting with the &quot;real world&quot;, I became an active member of <BLink href="https://hackclub.com">HackClub</BLink>, <BLink href="https://event.codeday.org/ba">organizing</BLink> <BLink href="https://dvhacks-3.devpost.com/">many</BLink> <BLink href="https://archive.vn/Q0LyP">events</BLink> (including <BLink href="https://angelhacks.org">AngelHacks</BLink> & the <BLink href="https://summer.hackclub.com">Summer of Making</BLink>). IMO I made <BLink href="https://github.com/neelr/BackFiler">some</BLink> <BLink href="https://github.com/neelr/goJSON">cool</BLink> <BLink href="https://github.com/neelr/LeishNN">projects</BLink> <BLink href="https://github.com/neelr/flappyai">too</BLink>.</Text>
          <Text as="p" mt="10px">Blasting off I gathered experiences—some <BLink href="https://roambee.com">crazy</BLink> <BLink href="https://www.fbk.eu/en/">AI</BLink> <BLink href="https://teachaids.org">internships</BLink>, took part in <BLink href="https://notebook.neelr.dev/stories/the-hacker-zephyr-">the world&rsquo;s longest (3,502 mile-long) hackathon</BLink>, and <BLink href="https://github.com/neelr/clamp">independent research on turning CO2 into fuel @ NeurIPS</BLink>! Also hacked on <BLink href="https://nujjet.vercel.app/">some neuro things</BLink> in <BLink href="https://web.archive.org/web/20240508030333/https://www.conradchallenge.org/2021-summit-awards#block-6efb5b1ca96f674c86ca">the past</BLink>.</Text>
          <Text as="p" mt="10px">If you find any of this interesting, or just want to talk, hit me up with an email with something resembling my name [at] this domain! I&rsquo;m trying to read more, so recommend me some books/music!</Text>
          <Text as="p" mt="10px">Most recently caught &quot;{githubRecent.message}&quot; @ <BLink href={githubRecent.url}>{githubRecent.repo}</BLink></Text>
          <Text as="h2" mt="15px">Notebook Posts!</Text>
          <Box sx={{ flexWrap: "wrap", display: "flex" }}>
            {notebookFeed.map((post, i) => (
              <Box sx={{ display: "flex", flexDirection: "column", mb: 3, width: ["100%", "45%"], px: "2%" }} key={i}>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={post.link}
                >
                  <Text as="h3" sx={{ textDecoration: "underline" }}>{post.title}</Text>
                  <I src={post.image} width={320} alt={post.title} />
                </Link>
                <Text sx={{ color: "text" }} as="p">{`${formatNotebookDate(post.pubDate)} ${post.description}`}</Text>
                <Text sx={{ color: "text" }} as="p">{post.tags.map((tag, i) => <span key={i}><BLink href={`https://notebook.neelr.dev/tags/${encodeURIComponent(tag)}`}>{`#${tag}`}</BLink>{i < post.tags.length - 1 ? " / " : ""}</span>)}</Text>
              </Box>
            ))}
          </Box>
          <hr />
          <Text sx={{ fontStyle: "italic" }}>Find me at {location.city} where it&rsquo;s {location.weather}</Text>
          <Text as="p"><BLink href={"https://github.com/neelr/MyWebsite"}>Source</BLink> | <BLink href={"https://neelr.netlify.app/"}>v1</BLink></Text>
          {confetti && <Typer steps={['—Thanks for scrolling through my site!', 1000, "—Made with <3 by neelr"]} />}
          <SpotifyBar date={date} spotifyData={spotifyData} />
          <Box onClick={() => window.open('https://web-dit.vercel.app', '_blank', 'noopener,noreferrer')}
            sx={{ cursor: 'pointer', width: 190, height: 190 }}>
            <iframe
              style={{ pointerEvents: 'none' }}
              src="https://web-dit.vercel.app/embed.html"
              width={190}
              height={190}
              frameBorder={0}
              loading="eager"
              title="Interactive hippo canvas"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=86400"
  );

  let quote = await getQuote();
  /*  song: string;
  artist: string;
  album: string;
  albumArt: string;
  url: string;
  timestamp: number;
  progress: number;
  duration: number; */
  let spotifyData: spotifyType = {
    song: "nothing",
    artist: "nothing",
    album: "nothing",
    albumArt: "",
    url: "nothing",
    timestamp: 0,
    progress: -100,
    duration: 0,
    device: {
      name: "nothing",
      type: "nothing",
    }
  }
  let location = await getLocation();
  let githubRecent = await getGithubRecentCommit();

  let notebookRSS = await fetch('https://notebook.neelr.dev/feed_first5.json');
  let notebookFeed: NotebookPost[] = (await notebookRSS.json()).filter((item: any) => item.image != null).splice(0, 4).map((item: any) => {
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
