import type { NextApiRequest, NextApiResponse } from "next";
import { createClient, PostgrestError } from "@supabase/supabase-js";

const supabaseUrl = "https://aakrckrbnfpxpneskjdv.supabase.co";
const supabaseKey = `${process.env.DATABASE_KEY}`;
const supabase = createClient(supabaseUrl, supabaseKey);

export type Data = {
  error: PostgrestError | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { data, error } = await supabase
    .from("locations")
    .upsert({
      id: Date.now(),
      city: req.body.location,
      weather: req.body.weather,
    });
  res.status(200).json({ error });
}
