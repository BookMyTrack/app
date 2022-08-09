import { CalendarIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import type { FC, PropsWithChildren } from "react";
import React, { useMemo } from "react";
import { compareDesc, differenceInDays } from "date-fns";

import type { Track } from "~/lib/models/track";

interface ITrackCardProps {
  track: Track;
}

const TrackCard: FC<PropsWithChildren<ITrackCardProps>> = ({ track }) => {
  const event = useMemo(
    () =>
      track.events.sort((a, b) =>
        compareDesc(new Date(a.start), new Date(b.start))
      )?.[0],
    [track]
  );

  const days = useMemo(
    () => differenceInDays(new Date(event?.start ?? Date.now()), new Date()),
    [event]
  );

  return (
    <div
      className="rounded-md overflow-hidden transition-opacity hover:opacity-75 cursor-pointer relative w-[300px] h-[300px] aspect-w-1 aspect-h-1"
      style={{
        background: `url(${
          track.image_url ?? `/track-photos/${track.id}.jpeg`
        }) no-repeat center`,
        backgroundSize: "cover",
      }}
    >
      <div
        className={clsx(
          "to-black/25 from-black bg-gradient-to-t w-full h-full overflow-hidden"
        )}
      >
        <div className="flex flex-col items-start justify-end w-full h-full">
          <div className="px-8 mx-auto">
            <img
              alt={track.name}
              src={track.image_url ?? `/track-images/${track.id}.svg`}
            />
          </div>
          <div className="flex flex-col items-start justify-start w-full p-4 text-white">
            <h3 id="title" className="text-lg font-medium">
              {track.name}
            </h3>
            <p className="text-sm text-white/75">{track.address}</p>
          </div>
          <div className="bg-black/25 backdrop-blur-sm flex items-center justify-end w-full gap-3 p-4 text-white/80">
            {days === 0 ? (
              "No events planned."
            ) : (
              <>
                Next event in {days ?? "--"} days{" "}
                <CalendarIcon className="w-5" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

TrackCard.displayName = "TrackCard";

export default TrackCard;
