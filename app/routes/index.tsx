import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import TrackCard from "~/components/TrackCard";
import { trackEvent } from "~/lib/analytics";
import { useAppState } from "~/lib/state/app-state";
import * as track from "../lib/models/track";

export const loader: LoaderFunction = async () => {
  const response = await track.getAll();

  if (response._tag === "Left") {
    console.error(response.left);
    return json([]);
  }

  return json(response.right);
};

export default function Index() {
  const tracks: track.Track[] = useLoaderData<typeof loader>();
  const setTrack = useAppState((s) => s.setTrack);

  return (
    <div className="max-w-8xl justify-items-center w-full h-full p-8 mx-auto">
      <h1 className="text-2xl text-center md:text-left md:text-3xl rx-text-neutral-12 font-bold mb-8">
        Choose your favorite track
      </h1>
      <div className="flex items-start justify-center sm:justify-evenly md:justify-start gap-8 flex-wrap">
        {tracks && tracks.length === 0 && <p> No tracks available </p>}
        {tracks.map((track) => (
          <Link
            to={`/tracks/${track.id}/events`}
            key={track.id}
            className="flex max-w-[300px] items-center justify-center"
            onClick={() => {
              setTrack(track);
              trackEvent("track-click", 0, {
                trackId: track.id,
                trackName: track.name,
              });
            }}
          >
            <TrackCard track={track} />
          </Link>
        ))}
      </div>
    </div>
  );
}
