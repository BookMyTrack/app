import * as t from "io-ts";
import * as tt from "io-ts-types";
import { Url, url } from "./custom-types/url";
import { TimestampFromStringDate } from "./custom-types/date";

export const Organization = t.type({
  id: t.number,
  name: t.string,
  address: t.union([t.string, t.null]),
  vat: t.union([t.string, t.null]),
  site_url: t.union([t.string, t.null]),
});

export type Organization = t.TypeOf<typeof Organization>;

export const TrackEvent = t.type({
  id: t.number,
  title: t.string,
  description: t.string,
  duration: t.number,
  start: TimestampFromStringDate,
  netPrice: t.number,
  quantity: t.number,
  track_id: t.number,
  organization_id: t.number,
  organization: Organization,
  url: tt.fromNullable(url, "" as Url),
});

export type TrackEvent = t.TypeOf<typeof TrackEvent>;
