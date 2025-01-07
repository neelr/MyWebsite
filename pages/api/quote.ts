import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

export type Quote = {
  text: string;
  author: string;
};

export type Data = {
  quote: string;
  author: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const quote = await getQuote();
  res.status(200).json(quote);
}

/**
 * Gets a random quote from the local quotes.json file
 * @returns An object containing the quote text and author
 */
export async function getQuote(): Promise<Data> {
  // Read the quotes file
  const filePath = path.join(process.cwd(), "public", "quotes.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const quotes: Quote[] = JSON.parse(fileContents);

  // Get a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  return {
    quote: randomQuote.text,
    author: randomQuote.author || "Anonymous",
  };
}
