import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { addMinutes, format, formatDistance } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { Button } from "ariakit/button";

import groupBy from "lodash.groupby";
import { TrackEvent } from "~/lib/models";
import { Track } from "~/lib/models/track";
import { getById } from "~/lib/models/track";
import { useAppState } from "~/lib/state/app-state";
import clsx from "clsx";
import { isRight } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/PathReporter";
import sortBy from "lodash.sortby";

export const loader: LoaderFunction = async ({ params }) => {
  const id = parseInt(params.trackId!);

  if (isNaN(id) || !params.trackId) {
    return redirect("/");
  }

  try {
    const track = await getById(id);
    const decoded = Track.decode(track);

    if (isRight(decoded)) {
      return json(decoded.right);
    }

    console.error(PathReporter.report(decoded));

    return redirect("/");
  } catch (error) {
    console.error(error);

    return redirect("/");
  }
};

export default function TrackById() {
  const track: Track = useLoaderData();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const setTrack = useAppState((s) => s.setTrack);
  const events = useMemo(() => {
    if (!track) return {};

    return groupBy(
      sortBy(track.events, (e) => e.start),
      (item) => format(new Date(item.start), "eeee dd MMM")
    );
  }, [track]);

  useEffect(() => {
    setTrack(track);
  }, [track]);

  return (
    <>
      {track?.events?.length === 0 && (
        <div className="relative flex items-center justify-center w-full h-48 p-12 text-center border-2 border-gray-300 border-dashed rounded-lg">
          <span className="text-sm font-medium text-gray-900">
            No track-days available for <b>{track.name}</b>
          </span>
        </div>
      )}

      {Object.entries(events)?.map(([date, trackDays]) => (
        <div key={date} className="py-4">
          <div className="w-full flex items-center justify-start">
            <h3 className="text-lg mr-auto font-bold py-4">{date}</h3>
            <h3 className="text-lg font-bold py-4">
              {trackDays.length} Events
            </h3>
          </div>
          <ul className="lg:grid lg:grid-cols-2 flex flex-col gap-4">
            {trackDays
              .slice(0, expanded[date] ? trackDays.length : 4)
              .map((trackDay) => (
                <TrackDayItem trackDay={trackDay} key={trackDay.id} />
              ))}
          </ul>
          {!expanded[date] && (
            <Button
              className="w-full py-4 mt-4 rounded-lg rx-bg-neutral-2 hover:rx-bg-neutral-3 flex items-center justify-center"
              onClick={() => setExpanded((s) => ({ ...s, [date]: true }))}
            >
              View More
            </Button>
          )}
        </div>
      ))}
    </>
  );
}

const TrackDayItem = ({ trackDay }: { trackDay: TrackEvent }) => {
  const date = useMemo(() => {
    const date = format(trackDay.start, "EEEE, dd MMM yyyy");

    const end = addMinutes(trackDay.start, trackDay.duration);

    const startHour = format(trackDay.start, "HH:mm");
    const endHour = format(
      addMinutes(trackDay.start, trackDay.duration),
      "HH:mm"
    );

    return {
      asString: date,
      start: startHour,
      end: endHour,
      duration: formatDistance(end, trackDay.start),
    };
  }, [trackDay.start, trackDay.duration]);

  return (
    <li className="rx-bg-neutral-3 rx-border-neutral-6 flex items-center justify-start p-4 border rounded-lg shadow">
      <div>
        <h3 className="text-lg font-bold">{trackDay.title}</h3>
        <p className="uppercase mb-2 font-medium">{trackDay.description}</p>
        <time dateTime={date.start}>{date.asString}</time>
        <p>
          {date.start} - {date.end}{" "}
          <small className="text-sm">
            {date.duration !== "" ? `(${date.duration})` : ""}
          </small>
        </p>
      </div>
      <Button
        onClick={() => window.open(`${trackDay.url}?ref=bookmytrack`, "_blank")}
        disabled={!trackDay.url || trackDay.quantity === 0}
        className={clsx(
          "rx-bg-orange-10 ml-auto border text-white rx-border-orange-6",
          "text-md font-semibold",
          "flex items-center justify-center gap-4",
          "py-2 px-4 rounded-lg",
          "hover:opacity-75 duration-150 transition-all",
          "disabled:bg-[transparent] disabled:border-[transparent] disabled:rx-text-neutral-11"
        )}
      >
        {trackDay.quantity === 0
          ? "Sold Out"
          : trackDay.netPrice === 0
          ? "Free"
          : `$${trackDay.netPrice}`}
      </Button>
    </li>
  );
};
