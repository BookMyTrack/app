import axios from "axios";
import { Pirsch } from "pirsch-sdk/web";

import {
  PirschEndpoint,
  PIRSCH_DEFAULT_BASE_URL,
  PIRSCH_DEFAULT_TIMEOUT,
  PIRSCH_URL_LENGTH_LIMIT,
} from "pirsch-sdk/constants";
import { PirschBrowserHit, Scalar } from "pirsch-sdk/types";

export const pirsch = new Pirsch({
  identificationCode: "F7N9mSGHbl2AWeeVOYn7hQTge0ievh48",
});

const pirschClient = axios.create({
  baseURL: PIRSCH_DEFAULT_BASE_URL,
  timeout: PIRSCH_DEFAULT_TIMEOUT,
});

export const trackEvent = (
  name: string,
  duration?: number,
  data?: Record<string, Scalar>
) => pirsch.event(name, duration, data);

export const trackEvent_old = (
  name: string,
  duration?: number,
  data?: Record<string, Scalar>
) => {
  const hit = hitFromBrowser();

  if (hit.dnt === "1") {
    console.debug("DNT");
    return;
  }

  if (location.href.includes("localhost")) {
    console.debug("PirschEvent: ", {
      name,
      duration,
      metadata: data,
      hit,
    });
    return;
  }

  const payload = {
    identification_code: "F7N9mSGHbl2AWeeVOYn7hQTge0ievh48",
    event_name: name,
    event_duration: duration,
    event_meta: prepareScalarObject(data),
    ...hit,
  };

  const options = {
    headers: { "Content-Type": "application/json" },
  };

  return pirschClient.post(PirschEndpoint.EVENT, payload, options);
};

const hitFromBrowser = () => {
  const element: PirschBrowserHit = {
    url: location.href.slice(0, PIRSCH_URL_LENGTH_LIMIT),
    title: document.title,
    referrer: document.referrer,
    screen_width: screen.width,
    screen_height: screen.height,
  };

  if (navigator.doNotTrack === "1") {
    element.dnt = navigator.doNotTrack;
  }

  return element;
};

function prepareScalarObject(
  value?: Record<string, Scalar>
): Record<string, string> | undefined {
  if (!value) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value];
      }

      return [key, value.toString()];
    })
  );
}
