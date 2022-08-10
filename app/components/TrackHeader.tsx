import {
  CalendarIcon,
  CurrencyDollarIcon,
  LocationMarkerIcon,
  MapIcon,
} from "@heroicons/react/outline";
import format from "date-fns/format";
import type { FC, PropsWithChildren } from "react";
import React, { useMemo } from "react";

import type { TrackEvent } from "~/lib/models/events";
import type { Track } from "~/lib/models/track";
import Button from "./Button";

interface ITrackDaysHeaderProps {
  track: Track;
}

const getPriceRange = (events: TrackEvent[]): [min: number, max: number] => {
  const prices = events.map((event) => event.netPrice);
  return [Math.min(...prices), Math.max(...prices)];
};

const TrackHeader: FC<PropsWithChildren<ITrackDaysHeaderProps>> = ({
  track,
}) => {
  const priceRange = useMemo(() => {
    const [min = 0, max = 0] = getPriceRange(track?.events);

    if (min === Infinity || max === Infinity) return "--";

    if (min === max) return `$${min}`;
    return `$${min} - $${max}`;
  }, [track]);

  const datesRange = useMemo(() => {
    const dates = track.events
      ?.map((track) => new Date(track.start))
      .sort((a, b) => a.getTime() - b.getTime());

    if (dates.length === 0) return "--";

    if (dates.length === 1) return format(dates[0], "MMM");
    return `${format(dates[0], "MMM")} - ${format(
      dates[dates.length - 1],
      "MMM"
    )}`;
  }, [track.events]);

  return (
    <div className="lg:flex w-full lg:items-center lg:justify-between rx-text-neutral-11 py-4">
      <div className="flex-1 min-w-0">
        <h2 className="sm:text-3xl sm:truncate rx-text-neutral-12 text-2xl font-bold leading-7">
          {track.name}
        </h2>
        <div className="sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6 flex flex-col mt-1">
          <a
            href={`https://maps.google.com/?q=${track.latitude},${track.longitude}`}
            target="_blank"
            className="flex hover:underline items-center mt-2 text-sm"
          >
            <LocationMarkerIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5"
              aria-hidden="true"
            />
            {track.address}
          </a>
          <div className="flex items-center mt-2 text-sm">
            <CurrencyDollarIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5"
              aria-hidden="true"
            />
            {priceRange}
          </div>
          <div className="flex items-center mt-2 text-sm uppercase">
            <CalendarIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5"
              aria-hidden="true"
            />
            {datesRange}
          </div>
        </div>
      </div>
    </div>
  );
};

TrackHeader.displayName = "TrackHeder";

export default TrackHeader;
