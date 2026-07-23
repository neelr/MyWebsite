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

type SpotifyTokenResponse = {
  access_token?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

const SPOTIFY_API = "https://api.spotify.com/v1";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

let spotifyToken = "";
let spotifyTokenExpiresAt = 0;
let tokenRefresh: Promise<string> | null = null;

const nothingPlaying = (): Song => ({
  song: "Nothing Playing",
  artist: "",
  album: "",
  albumArt: "",
  url: "",
  timestamp: 0,
  progress: 0,
  duration: 0,
  playing: false,
  playlistUrl: "",
  playlistName: "",
});

const nothingPlayingData = (): Data => ({
  ...nothingPlaying(),
  device: { name: "", type: "" },
});

const requireEnvironmentVariable = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const refreshSpotifyToken = async (): Promise<string> => {
  const clientId = requireEnvironmentVariable("SPOTIFY_CLIENT_ID");
  const clientSecret = requireEnvironmentVariable("SPOTIFY_CLIENT_SECRET");
  const refreshToken = requireEnvironmentVariable("SPOTIFY_REFRESH_TOKEN");

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  const data = (await response.json()) as SpotifyTokenResponse;

  if (!response.ok || !data.access_token) {
    const reason = data.error_description || data.error || "unknown error";
    throw new Error(
      `Spotify token refresh failed (${response.status}): ${reason}`
    );
  }

  spotifyToken = data.access_token;
  spotifyTokenExpiresAt =
    Date.now() + Math.max((data.expires_in ?? 3600) - 60, 0) * 1000;

  return spotifyToken;
};

const getSpotifyToken = async (forceRefresh = false): Promise<string> => {
  if (
    !forceRefresh &&
    spotifyToken &&
    Date.now() < spotifyTokenExpiresAt
  ) {
    return spotifyToken;
  }

  if (!tokenRefresh) {
    tokenRefresh = refreshSpotifyToken().finally(() => {
      tokenRefresh = null;
    });
  }

  return tokenRefresh;
};

const spotifyFetch = async (
  path: string,
  forceRefresh = false
): Promise<Response> => {
  const token = await getSpotifyToken(forceRefresh);
  const response = await fetch(`${SPOTIFY_API}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401 && !forceRefresh) {
    return spotifyFetch(path, true);
  }

  return response;
};

const getSong = async (): Promise<Song> => {
  const response = await spotifyFetch(
    "/me/player/currently-playing?additional_types=episode"
  );

  if (response.status === 204) {
    return nothingPlaying();
  }
  if (!response.ok) {
    throw new Error(`Spotify currently-playing request failed (${response.status})`);
  }

  const playback = await response.json();
  if (!playback.item) {
    return nothingPlaying();
  }

  if (playback.item.type === "episode") {
    return {
      song: playback.item.name ?? "",
      artist: playback.item.show?.name ?? "",
      album: playback.item.show?.publisher ?? "",
      albumArt: playback.item.images?.[0]?.url ?? "",
      url: playback.item.external_urls?.spotify ?? "",
      timestamp: playback.timestamp ?? 0,
      progress: playback.progress_ms ?? 0,
      duration: playback.item.duration_ms ?? 0,
      playing: playback.is_playing ?? false,
      playlistUrl: playback.context?.uri ?? "",
    };
  }

  return {
    song: playback.item.name ?? "",
    artist: playback.item.artists?.[0]?.name ?? "",
    album: playback.item.album?.name ?? "",
    albumArt: playback.item.album?.images?.[0]?.url ?? "",
    url: playback.item.external_urls?.spotify ?? "",
    timestamp: playback.timestamp ?? 0,
    progress: playback.progress_ms ?? 0,
    duration: playback.item.duration_ms ?? 0,
    playing: playback.is_playing ?? false,
    playlistUrl: playback.context?.uri ?? "",
  };
};

const getDevice = async (): Promise<Device> => {
  const response = await spotifyFetch("/me/player/devices");
  if (!response.ok) {
    throw new Error(`Spotify devices request failed (${response.status})`);
  }

  const data = await response.json();
  const activeDevice = Array.isArray(data.devices)
    ? data.devices.find((device: { is_active?: boolean }) => device.is_active)
    : undefined;

  return {
    name: activeDevice?.name ?? "",
    type: activeDevice?.type ?? "",
  };
};

const addPlaylistDetails = async (song: Song): Promise<Song> => {
  if (!song.playlistUrl?.startsWith("spotify:playlist:")) {
    return song;
  }

  const playlistId = song.playlistUrl.split(":")[2];
  const response = await spotifyFetch(`/playlists/${playlistId}`);
  if (!response.ok) {
    return song;
  }

  const playlist = await response.json();
  return {
    ...song,
    playlistName: playlist.name ?? "",
    playlistUrl: playlist.external_urls?.spotify ?? song.playlistUrl,
  };
};

export const getSpotifyData = async (): Promise<Data> => {
  const song = await addPlaylistDetails(await getSong());
  const device =
    song.duration > 0
      ? await getDevice().catch(() => ({ name: "Spotify", type: "" }))
      : { name: "", type: "" };

  return { ...song, device };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader("Cache-Control", "no-store");

  try {
    res.status(200).json(await getSpotifyData());
  } catch (error) {
    console.error(
      "Spotify API request failed:",
      error instanceof Error ? error.message : error
    );
    res.status(503).json(nothingPlayingData());
  }
}
