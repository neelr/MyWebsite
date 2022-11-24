import type { NextApiRequest, NextApiResponse } from "next";
import { createClient, PostgrestError } from "@supabase/supabase-js";

const supabaseUrl = "https://aakrckrbnfpxpneskjdv.supabase.co";
const supabaseKey = `${process.env.DATABASE_KEY}`;
const supabase = createClient(supabaseUrl, supabaseKey);

export type Data = {
  city: string;
  weather: string;
  error: PostgrestError | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { data, error } = await supabase
    .from("locations")
    .select("city, weather")
    .order("id", { ascending: false })
    .limit(1);
  let resp: Data = { city: "", weather: "", error };
  if (data) {
    resp = {
      city: data[0].city,
      weather: data[0].weather,
      error: null,
    };
  }
  res.status(200).json(resp);
}
