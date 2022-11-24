import type { NextApiRequest, NextApiResponse } from "next";
import { createClient, PostgrestError } from "@supabase/supabase-js";

const supabaseUrl = "https://aakrckrbnfpxpneskjdv.supabase.co";
const supabaseKey = `${process.env.DATABASE_KEY}`;
const supabase = createClient(supabaseUrl, supabaseKey);

export type Data = {
  error: PostgrestError | null | string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // check auth
  if (req.headers.authorization !== `Bearer ${process.env.LOCATION_KEY}`)
    return res.status(401).json({ error: "Not Authed" });
  // check if req.body is valid

  if (req.body.city && req.body.weather) {
    await supabase.from("locations").upsert({
      id: Date.now(),
      city: req.body.location,
      weather: req.body.weather,
    });
  } else {
    return res.status(400).json({ error: "Bad Request" });
  }
  res.status(200).json({ error: null });
}
