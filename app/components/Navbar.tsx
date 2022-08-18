import {
  CalendarIcon,
  CurrencyDollarIcon,
  SupportIcon,
} from "@heroicons/react/outline";
import { Link } from "@remix-run/react";
import { FC, PropsWithChildren } from "react";
import { useAppState } from "~/lib/state/app-state";
import { AnimatePresence, motion } from "framer-motion";
import * as O from "fp-ts/Option";

import Button from "./Button";
import { displayPriceRange, getDatesRange } from "./TrackHeader";

interface INavbarProps {}

const Navbar: FC<PropsWithChildren<INavbarProps>> = () => {
  const [isVisible, track] = useAppState((s) => [s.extraNavVisible, s.track]);

  return (
    <div className="sticky top-0 z-50 flex flex-col">
      <nav className="rx-border-neutral-6 border-b rx-border-neutral-6 rx-bg-neutral-1 z-10 flex items-center justify-between p-4 border-b">
        <Link to="/">
          <div className="flex items-center gap-5">
            <img
              src="/logo.png"
              alt="BookMyTrack"
              className="w-12 rounded-md"
            />
            <h2 className="rx-text-neutral-12 text-2xl font-black uppercase">
              bookmytrack
            </h2>
          </div>
        </Link>

        <div className="flex gap-4">
          {/*
          <Button
            as={Link}
            to="/tips"
            className="flex rx-text-neutral-11 hover:rx-bg-neutral-3 items-center gap-4"
            primary={false}
          >
            Tips
          </Button>
          <Button
            as={Link}
            to="/frequently-asked-questions"
            className="flex rx-text-neutral-11 hover:rx-bg-neutral-3 items-center gap-4"
            primary={false}
          >
            FAQ
          </Button>
        */}
          <Button
            as="a"
            href="https://wa.me/message/2WMFROGBWFBGO1"
            target="_blank"
            className="flex items-center gap-4"
          >
            <SupportIcon className="w-5" />
            Support
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {isVisible && O.isSome(track) && (
          <motion.nav
            className="flex gap-4 border-b rx-border-neutral-6 bg-neutral-1/75 dark:bg-neutralDark-1/75 rx-text-neutral-11 items-center justify-start backdrop-blur p-4"
            exit={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            initial={{ opacity: 0, translateY: -20 }}
          >
            <p className="mr-auto">{track.value.name}</p>

            <div className="flex gap-2 flex-col">
              <p className="flex items-center justify-start gap-2">
                <CalendarIcon className="w-5 flex-shrink-0" />
                {getDatesRange(track.value.events)}
              </p>
              <p className="flex items-center text-sm ">
                {displayPriceRange(track.value.events)}
              </p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

Navbar.displayName = "Navbar";

export default Navbar;
