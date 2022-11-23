import type { NextApiRequest, NextApiResponse } from "next";
/* Example Response
{
  "quoteText":"The more light you allow within you, the brighter the world you live in will be.", 
  "quoteAuthor":"Shakti Gawain", 
  "senderName":"", 
  "senderLink":"", 
  "quoteLink":"http://forismatic.com/en/d386119c9d/"
} */
type QuoteData = {
  quoteText: string;
  quoteAuthor: string;
  senderName: string;
  quoteLink: string;
};

type Data = {
  quote: string;
  quoteAuthor: string;
};

let qFallback: QuoteData;

fetch("http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en")
  .then((r) => r.json())
  .then((data: QuoteData) => (qFallback = data));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let data: QuoteData;
  try {
    let q = await fetch(
      "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
    );
    data = await q.json();
  } catch (e) {
    data = qFallback;
  }
  res
    .status(200)
    .json({ quote: data.quoteText, quoteAuthor: data.quoteAuthor });
}
