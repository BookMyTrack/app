import { SupportIcon } from "@heroicons/react/outline";
import { Link } from "@remix-run/react";
import type { FC, PropsWithChildren } from "react";

import Button from "./Button";

interface INavbarProps {}

const Navbar: FC<PropsWithChildren<INavbarProps>> = () => {
  return (
    <nav className="rx-border-neutral-6 top-0 border-b rx-border-neutral-6 sticky rx-bg-neutral-1 flex items-center justify-between p-4 border-b">
      <Link to="/">
        <div className="flex items-center gap-5">
          <img src="/logo.png" alt="BookMyTrack" className="w-12 rounded-md" />
          <h2 className="rx-text-neutral-12 text-2xl font-black uppercase">
            bookmytrack
          </h2>
        </div>
      </Link>

      <div>
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
  );
};

Navbar.displayName = "Navbar";

export default Navbar;
