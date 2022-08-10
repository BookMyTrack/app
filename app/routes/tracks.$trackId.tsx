import { Outlet } from "@remix-run/react";
import React, { FC, PropsWithChildren } from "react";
import TrackHeader from "~/components/TrackHeader";
import { useAppState } from "~/lib/state/app-state";
import * as O from "fp-ts/Option";
import Map from "react-map-gl";

interface ITrackDetailLayoutProps {}

const TrackDetailLayout: FC<
  PropsWithChildren<ITrackDetailLayoutProps>
> = () => {
  const track = useAppState((s) => s.track);

  return (
    <>
      {O.isSome(track) && (
        <div className="w-full relative mt-8 h-[300px] overflow-hidden rounded-lg">
          <div className="inset-0 p-8 flex items-start justify-end flex-col absolute bg-[rgba(0,0,0,.35)] z-50">
            <TrackHeader track={track.value} />
          </div>
          <Map
            mapboxAccessToken={
              "pk.eyJ1IjoicmF3bmx5IiwiYSI6ImNsNm5wNXEycjAyeW0zbHQxYm9laGFmbHQifQ.wAPW7MZv6BDNwiU0uI1RuQ"
            }
            mapStyle="mapbox://styles/rawnly/ck8d08zcr2drx1imyqmq9apoe"
            dragPan={false}
            scrollZoom={false}
            style={{
              width: "100%",
              height: "100%",
            }}
            attributionControl={false}
            initialViewState={{
              latitude: track.value.latitude,
              longitude: track.value.longitude,
              zoom: 14,
              bearing: 90,
              pitch: 15,
            }}
          />
        </div>
      )}
      <div className="max-w-7xl lg:px-8 md:py-8 w-full px-4 mx-auto">
        <Outlet />
      </div>
    </>
  );
};

TrackDetailLayout.displayName = "TrackDetailLayout";

export default TrackDetailLayout;
