import React from "react";

interface IFooterProps {}

const Footer: React.FC<React.PropsWithChildren<IFooterProps>> = () => {
  return (
    <footer className="mt-auto py-8">
      {/* <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-center lg:px-8"></div> */}
      <div className="mt-8 md:mt-0 md:order-1">
        <p className="text-center text-base text-gray-400">
          &copy; 2022 BookMYTrack, All rights reserved.
        </p>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";

export default Footer;
