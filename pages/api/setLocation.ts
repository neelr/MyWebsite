import type { NextApiRequest, NextApiResponse } from "next";
import { createClient, PostgrestError } from "@supabase/supabase-js";

const supabaseUrl = "https://aakrckrbnfpxpneskjdv.supabase.co";
const supabaseKey = `${process.env.DATABASE_KEY}`;
const supabase = createClient(supabaseUrl, supabaseKey);

export type Data = {
  error: PostgrestError | null | string;
};

async function checkAuth(req: NextApiRequest) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new Error("Not Authed");
  }

  const key = authorization.split(" ")[1];
  if (key !== process.env.LOCATION_KEY) {
    throw new Error("Not Authed");
  }
}

async function insertLocation(req: NextApiRequest) {
  const location = req.body.location;
  const weather = req.body.weather;
  const lat = req.body.lat;
  const lon = req.body.lon;

  if (!location || !weather || !lat || !lon) {
    throw new Error("Bad Request");
  }

  await supabase.from("locations").upsert({
    id: Date.now(),
    city: location,
    weather: weather,
    lat: lat,
    lon: lon,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await checkAuth(req);
    await insertLocation(req);
  } catch (error) {
    return res.status(400).json({ error: `${error}` });
  }

  res.status(200).json({ error: null });
}
