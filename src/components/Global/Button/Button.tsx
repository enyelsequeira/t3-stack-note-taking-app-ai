import type { VariantProps } from "cva";
import { cva } from "cva";
import type { LinkProps } from "next/link";
import Link from "next/link";
import React, { forwardRef } from "react";
import { classNames } from "../CVA";

type InferredVariantProps = VariantProps<typeof buttonClasses>;
export type ButtonColor = NonNullable<InferredVariantProps["color"]>;
export type ButtonBaseProps = {
  /** Action that happens when the button is clicked */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /**Left aligned icon*/
  StartIcon?: React.ElementType;
  /**Right aligned icon */
  EndIcon?: React.ElementType;
  shallow?: boolean;
  /**Tool tip used when icon size is set to small */
  tooltip?: string;
  flex?: boolean;
} & Omit<InferredVariantProps, "color"> & {
    color?: ButtonColor;
  };

export type ButtonProps = ButtonBaseProps &
  (
    | (Omit<JSX.IntrinsicElements["a"], "href" | "onClick" | "ref"> & LinkProps)
    | (Omit<JSX.IntrinsicElements["button"], "onClick" | "ref"> & {
        href?: never;
      })
  );

const buttonClasses = cva(
  "inline-flex items-center text-sm font-medium relative rounded-md transition-colors",
  {
    variants: {
      color: {
        primary: "text-white dark:text-black",
        secondary: "text-gray-900 dark:text-darkgray-900",
        minimal: "text-gray-900 dark:text-darkgray-900",
        destructive: "",
      },
      size: {
        sm: "px-3 py-2 leading-4 rounded-sm" /** For backwards compatibility */,
        base: "h-9 px-4 py-2.5 ",
        lg: "h-[36px] px-4 py-2.5 ",
        icon: "flex justify-center min-h-[36px] min-w-[36px] ",
        // it uses the same primary classNames for desktop size
        fab: "h-14 w-14 sm:h-9 sm:w-auto rounded-full justify-center sm:rounded-md sm:px-4 sm:py-2.5 radix-state-open:rotate-45 sm:radix-state-open:rotate-0 transition-transform radix-state-open:shadown-none radix-state-open:ring-0 !shadow-none",
      },
      loading: {
        true: "cursor-wait",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
      },
      disabled: {
        true: "cursor-not-allowed",
      },
      padding: {
        hero: "px-4 py-1.5",
      },
      font: {
        hero: "text-base font-semibold leading-7",
      },
      intention: {
        hero: "inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700",
        save: "ml-5 inline-flex justify-center rounded-md border border-transparent bg-sky-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-50",
        subHero:
          "inline-block text-black rounded-lg px-4 py-1.5 text-base font-semibold leading-7  ring-1 ring-gray-900/10 hover:ring-gray-900/20",
      },
    },

    defaultVariants: {
      color: "primary",
      size: "base",
    },
  }
);
// this was taken as inspiration from
// https://github.com/calcom/cal.com/tree/main/packages/lib/cva

export const Button = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(function Button(props: ButtonProps, forwardedRef) {
  const {
    loading = false,
    color = "primary",
    size,
    intention,
    type = "button",
    StartIcon,
    EndIcon,
    shallow,
    ...passThroughProps
  } = props;

  const disabled = props.disabled || loading;

  const isLink = typeof props.href !== "undefined";
  const elementType = isLink ? "a" : "button";

  const element = React.createElement(
    elementType,
    {
      ...passThroughProps,
      disabled,
      type: !isLink ? type : undefined,
      ref: forwardedRef,
      className: classNames(
        buttonClasses({
          color,
          size,
          loading,
          intention,
          disabled: props.disabled,
        }),
        props.className
      ),
      onClick: disabled
        ? (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            e.preventDefault();
          }
        : props.onClick,
    },

    <>
      {StartIcon && (
        <>
          {size === "fab" ? (
            <>
              <StartIcon className="hidden h-4 w-4 stroke-[1.5px] ltr:mr-2 rtl:ml-2 sm:inline-flex" />
              {/* <Icon.FiPlus className="inline h-6 w-6 sm:hidden" /> */}
            </>
          ) : (
            <StartIcon
              className={classNames(
                "inline-flex",
                size === "icon"
                  ? "h-4 w-4 "
                  : "h-4 w-4 stroke-[1.5px] ltr:mr-2 rtl:ml-2"
              )}
            />
          )}
        </>
      )}
      {size === "fab" ? (
        <span className="flex sm:inline">{props.children}</span>
      ) : (
        props.children
      )}
      {loading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <svg
            className="mx-4 h-5 w-5 animate-spin text-black dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
      {EndIcon && (
        <>
          {size === "fab" ? (
            <>
              <EndIcon className="-mr-1 hidden h-5 w-5 ltr:ml-2 rtl:-ml-1 rtl:mr-2 sm:inline" />
              {/* <Icon.FiPlus className="inline h-6 w-6 sm:hidden" /> */}
            </>
          ) : (
            <EndIcon className="inline h-5 w-5 ltr:-mr-1 ltr:ml-2 rtl:mr-2" />
          )}
        </>
      )}
    </>
  );
  return props.href ? (
    <Link
      passHref
      href={props.href}
      shallow={shallow && shallow}
      legacyBehavior
    >
      {element}
    </Link>
  ) : (
    <Wrapper>{element}</Wrapper>
  );
});

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
