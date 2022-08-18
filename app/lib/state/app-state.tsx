import React from "react";
import create from "zustand";
import { Track } from "../models";
import * as O from "fp-ts/Option";

interface IAppState {
  track: O.Option<Track>;
  extraNavVisible: boolean;
}

type GetOptionType<T> = T extends O.Option<infer U> ? U : T;

type WithSetters<T, K extends keyof T = keyof T> = T & {
  [k in K & string as `set${Capitalize<k>}`]: React.Dispatch<
    React.SetStateAction<GetOptionType<T[k]>>
  >;
};

type State = WithSetters<IAppState>;

export const useAppState = create<State>((set) => ({
  track: O.none,
  setTrack: (track) =>
    set((s) => ({
      track: O.fromNullable(track instanceof Function ? track(s.track) : track),
    })),
  extraNavVisible: false,
  setExtraNavVisible: (extraNavVisible) =>
    set((s) => ({
      extraNavVisible:
        extraNavVisible instanceof Function
          ? extraNavVisible(s.extraNavVisible)
          : extraNavVisible,
    })),
}));
