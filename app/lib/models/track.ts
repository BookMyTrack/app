import * as t from "io-ts";
import * as tt from "io-ts-types";

import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";

import { api } from "../api";
import { TrackEvent as TrackEvent } from "./events";
import { pipe } from "fp-ts/lib/function";
import { nullable } from "./custom-types/utility";

export const Track = t.type({
  id: t.number,
  name: t.string,
  description: tt.fromNullable(t.string, ""),
  image_url: nullable(t.string),
  site_url: nullable(t.string),
  track_path_url: nullable(t.string),
  latitude: nullable(t.number),
  longitude: nullable(t.number),
  address: nullable(t.string),
  events: t.array(TrackEvent),
});

export type Track = t.TypeOf<typeof Track>;

export const getById = (id: number) =>
  api
    .get<Response<Track>>(`/generated/track/${id}`, {
      params: { responseSkipFields: "weather" },
    })
    .then((response) => response.data.entity);

export const getAll = pipe(
  TE.tryCatch(
    () =>
      api.get("/generated/track", {
        params: { responseSkipFields: "weather" },
      }),
    E.toError
  ),
  TE.map((r) => r.data.entity.data),
  TE.chainEitherKW(t.array(Track).decode)
);

interface Response<T> {
  status: number;
  statusInfo: string;
  entity: T extends Array<any>
    ? {
        pages: number;
        data: T;
      }
    : T;
}
