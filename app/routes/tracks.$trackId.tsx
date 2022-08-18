import { Outlet } from "@remix-run/react";
import { FC, PropsWithChildren, useEffect } from "react";
import TrackHeader from "~/components/TrackHeader";
import { useAppState } from "~/lib/state/app-state";
import * as O from "fp-ts/Option";
import Map from "react-map-gl";
import { useInView } from "react-intersection-observer";

interface ITrackDetailLayoutProps {}

const TrackDetailLayout: FC<
  PropsWithChildren<ITrackDetailLayoutProps>
> = () => {
  const { ref, inView } = useInView();
  const [track, setExtraNavVisibility] = useAppState((s) => [
    s.track,
    s.setExtraNavVisible,
  ]);

  useEffect(() => {
    setExtraNavVisibility(!inView);
  }, [inView]);

  return (
    <>
      {O.isSome(track) && (
        <div
          ref={ref}
          className="w-full relative mt-8 h-[300px] overflow-hidden rounded-lg"
        >
          <div className="inset-0 p-8 flex items-start justify-end flex-col absolute bg-[rgba(0,0,0,.35)] z-10">
            <TrackHeader track={track.value} />
          </div>
          <Map
            mapboxAccessToken={(window as any).ENV.MAPBOX_ACCESS_KEY}
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
