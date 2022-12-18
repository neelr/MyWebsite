import { Client } from "../../lib/prismic-configuration";
import Prismic from "prismic-javascript";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";

async function local(id: string): Promise<number> {
  let res = await fetch("https://notebook.neelr.dev/api/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  let data = await res.json();
  return data.stars;
}
async function checkAuth(req: NextApiRequest) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new Error("Not Authed");
  }

  const key = authorization.split(" ")[1];
  if (key !== process.env.NOTEBOOK_UPDATE_KEY) {
    throw new Error("Not Authed");
  }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check Authorization
  try {
    await checkAuth(req);
  } catch (error) {
    return res.status(400).json({ error: `${error}` });
  }

  let response = await Client.query(
    Prismic.Predicates.at("document.type", "stories"),
    {
      orderings: "[my.stories.date_created desc]",
      pageSize: 10,
      page: 1,
    }
  );
  let upvotes: { [key: string]: number } = {};
  for (let i = 0; i < response.results.length; i++) {
    console.log(`Fetching ${i + 1}/${response.results.length}...`);
    let votes = await local(response.results[i].id);
    upvotes[response.results[i].id] = votes;
  }
  let slugs: { [key: string]: string } = {};
  response.results.forEach((v) => {
    slugs[v.slugs[0]] = v.id;
  });
  let data = response.results.map((v) => {
    return {
      title: v.data.title[0].text,
      description: v.data.description[0].text,
      pubDate: v.data.date_created,
      link: `https://notebook.neelr.dev/${v.slugs[0]}`,
      stars: upvotes[v.id],
      tags: v.tags,
      image: v.data.cover_image.url,
    };
  });
  // Update or create file in cache
  await fs.writeFile(
    "./cache/notebookCache.json",
    JSON.stringify(data),
    "utf8"
  );
  res.status(200).send("OK");
}

export type NotebookPost = {
  title: string;
  description: string;
  pubDate: string;
  link: string;
  stars: number;
  tags: string[];
  image: string;
};
