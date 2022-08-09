import * as t from "io-ts";
import * as tt from "io-ts-types";

import { api } from "../api";
import { TrackEvent as TrackEvent } from "./events";

const nullable = (type: t.Mixed) => t.union([type, t.null]);

export const Track = t.type({
  id: t.number,
  name: t.string,
  description: tt.fromNullable(t.string, ""),
  image_url: nullable(t.string),
  site_url: nullable(t.string),
  track_path_url: nullable(t.string),
  // map_url: nullable(t.string),
  latitude: nullable(t.number),
  longitude: nullable(t.number),
  address: t.string,
  // available: t.boolean,
  events: t.array(TrackEvent),
});

export type Track = t.TypeOf<typeof Track>;

export const getById = (id: number) =>
  api
    .get<Response<Track>>(`/track/${id}`, {
      params: { responseSkipFields: "weather" },
    })
    .then((response) => response.data.entity);

export const getAll = () =>
  api
    .get<Response<Track[]>>("/track", {
      params: { responseSkipFields: "weather" },
    })
    .then((response) => response.data.entity.data);

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
