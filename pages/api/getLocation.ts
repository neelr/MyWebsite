import type { NextApiRequest, NextApiResponse } from "next";
import { createClient, PostgrestError } from "@supabase/supabase-js";

const supabaseUrl = "https://aakrckrbnfpxpneskjdv.supabase.co";
const supabaseKey = `${process.env.DATABASE_KEY}`;
const supabase = createClient(supabaseUrl, supabaseKey);

export type Data = {
  city: string;
  weather: string;
  error: PostgrestError | null;
  coords?: {lat: number, lon: number};
};

export let getLocation = async (key = ""): Promise<Data> => {
  const { data, error } = await supabase
    .from("locations")
    .select("city, weather, lat, lon")
    .order("id", { ascending: false })
    .limit(1);

  let resp: Data = { city: "", weather: "", coords:{lat:0, lon:0}, error };

  if (data) {
    resp = {
      city: data[0].city,
      weather: data[0].weather,
      error: null,
    };

    if (key == process.env.LOCATION_PRECISE_KEY) {
      resp.coords = {lat: data[0].lat, lon: data[0].lon};
    }
  }

  return resp;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(await getLocation(req.body.key));
}
