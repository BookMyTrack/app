import type { Component } from "ariakit-utils/ts/types";
import type { ButtonOptions } from "ariakit/button";
import { Button as AriaButton } from "ariakit/button";
import clsx from "clsx";

interface IButtonProps extends ButtonOptions<"button"> {
  primary?: boolean;
}

const Button: Component<IButtonProps> = ({ primary = true, ...props }) => {
  return (
    <AriaButton
      {...props}
      className={clsx(
        "px-4 py-2 transition-all duration-150 rounded-md",
        {
          "rx-text-orange-11 hover:rx-bg-orange-3": primary,
        },
        props.className
      )}
    >
      {props.children}
    </AriaButton>
  );
};

Button.displayName = "Button";

export default Button;
