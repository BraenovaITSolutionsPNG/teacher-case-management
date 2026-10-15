import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cosmicButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-[0.9375rem] font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-200",
      },
      size: {
        default: "h-11 w-full",
        sm: "h-9 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CosmicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cosmicButtonVariants> {
  as?: undefined;
}

export interface CosmicAnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof cosmicButtonVariants> {
  as: "a";
  href: string;
}

type Props = CosmicButtonProps | CosmicAnchorProps;

const CosmicButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  (props, ref) => {
    if (props.as === "a") {
      const { className, variant, size, ...rest } = props;
      return (
        <a
          className={cn(cosmicButtonVariants({ variant, size, className }))}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...rest}
        />
      );
    }
    const { className, variant, size, as, ...rest } = props;
    return (
      <button
        type={rest.type ?? "button"}
        className={cn(cosmicButtonVariants({ variant, size, className }))}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...rest}
      />
    );
  }
);
CosmicButton.displayName = "CosmicButton";

export { CosmicButton, cosmicButtonVariants };
