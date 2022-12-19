import type { NextApiRequest, NextApiResponse } from "next";

type Song = {
  song: string;
  artist: string;
  album: string;
  albumArt: string;
  url: string;
  timestamp: number;
  progress: number;
  duration: number;
  playing?: boolean;
  playlistName?: string;
  playlistUrl?: string;
};
type Device = {
  name: string;
  type: string;
};

export type Data = Song & {
  device: Device;
};

let spotifyToken = "";

let getSong = async (): Promise<Song> => {
  let resp = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    }
  );
  if (resp.status == 204)
    return {
      song: "Nothing Playing",
      artist: "",
      album: "",
      albumArt: "",
      url: "",
      timestamp: 0,
      progress: 0,
      duration: 0,
      playing: true,
      playlistUrl: "",
      playlistName: "",
    };
  let song = await resp.json();

  return {
    song: song.item.name,
    artist: song.item.artists[0].name,
    album: song.item.album.name,
    albumArt: song.item.album.images[0].url,
    url: song.item.external_urls.spotify,
    timestamp: song.timestamp,
    progress: song.progress_ms,
    duration: song.item.duration_ms,
    playing: song.is_playing,
    playlistUrl: song.context?.uri ?? null,
  };
};
let getDevice = async (): Promise<Device> => {
  let device = await fetch("https://api.spotify.com/v1/me/player/devices", {
    headers: {
      Authorization: `Bearer ${spotifyToken}`,
    },
  });
  let deviceData = await device.json();
  let deviceName = "";
  let deviceType = "";
  for (let d of deviceData.devices) {
    if (d.is_active) {
      deviceName = d.name;
      deviceType = d.type;
      break;
    }
  }
  return { name: deviceName, type: deviceType };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(await getSpotifyData());
}

export let getSpotifyData = async (): Promise<Data> => {
  let song: Song;
  // check if token is expired
  try {
    song = await getSong();
  } catch (e) {
    // get refresh token
    let access = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: `${process.env.SPOTIFY_REFRESH_TOKEN}`,
        client_id: `${process.env.SPOTIFY_CLIENT_ID}`,
        client_secret: `${process.env.SPOTIFY_CLIENT_SECRET}`,
      }),
    });
    spotifyToken = (await access.json()).access_token;
    song = await getSong();
  }
  if (song.playlistUrl?.includes("playlist")) {
    let playlist = await fetch(
      `https://api.spotify.com/v1/playlists/${song.playlistUrl.split(":")[2]}`,
      {
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
        },
      }
    );
    let playlistData = await playlist.json();
    song.playlistName = playlistData.name;
    song.playlistUrl = playlistData.external_urls.spotify;
  }
  let device = await getDevice();
  return { ...song, device };
};
