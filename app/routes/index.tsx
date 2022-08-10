import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import TrackCard from "~/components/TrackCard";
import { trackEvent } from "~/lib/analytics";

import * as track from "../lib/models/track";

export const loader: LoaderFunction = async () => {
  try {
    const response = await track.getAll();

    return json(response);
  } catch (error) {
    console.error(error);
    return json([]);
  }
};

export default function Index() {
  const tracks: track.Track[] = useLoaderData<typeof loader>();

  return (
    <div className="max-w-8xl justify-items-center grid items-start w-full h-full md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-8 mx-auto">
      {tracks && tracks.length === 0 && <p> No tracks available </p>}
      {tracks.map((track) => (
        <Link
          to={`/tracks/${track.id}/events`}
          key={track.id}
          className="flex max-w-[300px] items-center justify-center"
          onClick={() =>
            trackEvent("track-click", 0, {
              trackId: track.id,
              trackName: track.name,
            })
          }
        >
          <TrackCard track={track} />
        </Link>
      ))}
    </div>
  );
}
