import { type MouseEventHandler, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Shared, site-wide call-to-action button.
 *
 * One signature interaction across the whole project:
 *  - solid variants get a smooth diagonal shine sweep.
 *  - outline variants get a colour fill that wipes in from the left.
 *  - every button scales down slightly on click (spring effect).
 *  - the arrow icon shoots out to the right and a new one flies in from the left!
 */
const ctaVariants = cva(
  "group/cta relative inline-flex select-none items-center justify-center overflow-hidden rounded-sm font-semibold tracking-wide transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 motion-reduce:transform-none motion-reduce:transition-none",
  {
    variants: {
      variant: {
        solid:
          "bg-primary text-primary-foreground shadow-md shadow-primary/10 hover:shadow-xl hover:shadow-primary/30",
        outline:
          "border border-foreground/25 text-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/20",
        contrast:
          "bg-charcoal text-secondary shadow-md shadow-black/10 hover:shadow-xl hover:shadow-black/40",
        outlineLight:
          "border border-white/50 text-white hover:border-white hover:shadow-lg hover:shadow-black/10",
        solidLight:
          "bg-white text-charcoal shadow-md shadow-black/10 hover:shadow-xl hover:shadow-black/20",
      },
      size: {
        sm: "px-5 py-2.5 text-sm",
        md: "px-7 py-3.5 text-sm",
        lg: "px-8 py-4 text-base",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "lg",
      fullWidth: false,
    },
  },
);

type CtaVariant = NonNullable<VariantProps<typeof ctaVariants>["variant"]>;

const FILLED: ReadonlySet<CtaVariant> = new Set<CtaVariant>(["solid", "contrast", "solidLight"]);
const FILL_COLOR: Record<CtaVariant, string> = {
  solid: "bg-white/20",
  contrast: "bg-white/20",
  outline: "bg-primary",
  outlineLight: "bg-primary-foreground",
  solidLight: "bg-charcoal",
};

const HOVER_TEXT_COLOR: Record<CtaVariant, string> = {
  solid: "text-primary-foreground",
  contrast: "text-secondary",
  outline: "text-primary-foreground",
  outlineLight: "text-primary",
  solidLight: "text-white",
};

export type CtaButtonProps = VariantProps<typeof ctaVariants> & {
  children: ReactNode;
  className?: string;
  /** Trailing arrow, on by default. */
  icon?: boolean;
  /** Internal router link. */
  to?: string;
  params?: Record<string, unknown>;
  /** External / tel / mailto link. */
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
};

export function CtaButton({
  children,
  className,
  variant = "solid",
  size = "lg",
  fullWidth = false,
  icon = true,
  to,
  params,
  href,
  ...rest
}: CtaButtonProps) {
  const v: CtaVariant = variant ?? "solid";
  const classes = cn(ctaVariants({ variant, size, fullWidth }), className);

  const inner = (
    <>
      {/* Colour block that sweeps in from the left, carrying a shine on its leading edge */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-0 motion-reduce:hidden overflow-hidden flex items-center justify-center",
          FILL_COLOR[v],
          HOVER_TEXT_COLOR[v]
        )}
      >
        {/* Duplicated text that moves opposite to the sweep, staying visually pinned to the button */}
        <span className="absolute inset-0 translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-0 flex items-center justify-center gap-2 px-8 whitespace-nowrap">
          {children}
          {icon && (
            <span className="relative flex h-4 w-4 overflow-hidden shrink-0">
              <ArrowRight className="absolute inset-0 h-4 w-4" />
            </span>
          )}
        </span>
        <span className="absolute right-0 top-0 h-full w-12 bg-gradient-to-r from-transparent to-white/30 z-10" />
      </span>

      {/* Main Base Text */}
      <span className="relative z-10 inline-flex items-center justify-center gap-2 pointer-events-none">
        {children}
        {icon && (
          <span className="relative flex h-4 w-4 overflow-hidden shrink-0">
            <ArrowRight className="absolute inset-0 h-4 w-4 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-[150%]" />
            <ArrowRight className="absolute inset-0 h-4 w-4 -translate-x-[150%] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-0" />
          </span>
        )}
      </span>
    </>
  );

  if (to) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const linkProps: any = { to, params, className: classes, ...rest };
    return <Link {...linkProps}>{inner}</Link>;
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  );
}
