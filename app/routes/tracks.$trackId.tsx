import { Outlet } from "@remix-run/react";
import React, { FC, PropsWithChildren } from "react";
import TrackHeader from "~/components/TrackHeader";
import { useAppState } from "~/lib/state/app-state";
import * as O from "fp-ts/Option";

interface ITrackDetailLayoutProps {}

const TrackDetailLayout: FC<
  PropsWithChildren<ITrackDetailLayoutProps>
> = () => {
  const track = useAppState((s) => s.track);

  return (
    <div className="max-w-7xl lg:px-8 md:py-8 w-full px-4 mx-auto">
      {O.isSome(track) && <TrackHeader track={track.value} />}
      <div className="py-16">
        <Outlet />
      </div>
    </div>
  );
};

TrackDetailLayout.displayName = "TrackDetailLayout";

export default TrackDetailLayout;
