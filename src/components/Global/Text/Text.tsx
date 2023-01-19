import type { VariantProps } from "cva";
import { cva } from "cva";
import * as React from "react";
import { applyStyleToMultipleVariants, mergeClasses } from "../CVA";
import type {
  PolymorphicPropsWithoutRef,
  PolymorphicRef,
} from "../utils/types";

const DEFAULT_TAG = "p";

type InferredVariantProps = VariantProps<typeof textClasses>;

const textClasses = cva("", {
  variants: {
    strong: {
      true: "font-bold",
    },
    accent: {
      true: "animate-text bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent  font-black",
    },
    size: {
      h1: "text-4xl",
      h2: "text-3xl",
      h3: "text-2xl",
      h4: "text-xl",
      h5: "text-lg",
      h6: "text-base",
      p: "text-base",
      span: "text-sm",
    },
  },
  // compoundVariants: [
  //   ...applyStyleToMultipleVariants({
  //     strong: true,
  //     size: "h1",
  //     className: "text-6xl sm:text-7xl",
  //   }),
  // ],
});
// type TextProps = InferredVariantProps;
// I want to create a string type for for size and accent only

interface TextProps extends InferredVariantProps {
  variant?: `${NonNullable<InferredVariantProps["size"]>}/${NonNullable<
    InferredVariantProps["accent"]
  >}`;
}

const Text = React.forwardRef(
  <C extends React.ElementType = typeof DEFAULT_TAG>(
    {
      as,
      className,
      // variant = "p/false",
      size,
      strong,
      accent,
      ...rest
    }: PolymorphicPropsWithoutRef<TextProps, C>,
    ref: PolymorphicRef<C>
  ) => {
    // console.log({ variant });
    // const [test, accent2] = variant.split("/") as [
    //   InferredVariantProps["size"],
    //   InferredVariantProps["accent"]
    // ];
    const Element = as ?? DEFAULT_TAG;

    return (
      <Element
        ref={ref}
        className={mergeClasses(
          textClasses({
            // if test exist use test else use size
            size,

            strong,
            accent,
          }),
          className
        )}
        {...rest}
      />
    );
  }
);

export default Text;
//display name
Text.displayName = "Text";

// this could be a way to do it to make it more reusable in a future

// const DEFAULT_TAG = "p";

// type InferredVariantProps = VariantProps<typeof textClasses>;

// const textClasses = cva("", {
//   variants: {
//     weight: {
//       light: "font-light",
//       normal: "font-normal",
//       medium: "font-medium",
//       semibold: "font-semibold",
//       bold: "font-bold",
//       extrabold: "font-extrabold",
//       black: "font-black",
//     },
//     accent: {
//       true: "animate-text bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent  font-black",
//     },
//     size: {
//       h1: "text-4xl",
//       h2: "text-3xl",
//       h3: "text-2xl",
//       h4: "text-xl",
//       h5: "text-lg",
//       h6: "text-base",
//       p: "text-base",
//       span: "text-sm",
//     },
//   },

// });
// type TextProps = InferredVariantProps;

// interface TextInterface extends Omit<TextProps, "weight" | "accent" | "size"> {
//   variant?: `${NonNullable<TextProps["size"]>}/${NonNullable<
//     TextProps["weight"]
//   >}/${NonNullable<TextProps["accent"]>}`;
//   children: React.ReactNode;
// }

// const Text = React.forwardRef(
//   <C extends React.ElementType = typeof DEFAULT_TAG>({
//     children,
//     className,
//     as,
//     variant = "h6/normal/false",
//   }: PolymorphicPropsWithoutRef<TextInterface, C>) => {
//     const Element = as ?? DEFAULT_TAG;
//     const [size, weight, accent] = variant.split("/") as [
//       TextProps["size"],
//       TextProps["weight"],
//       TextProps["accent"]
//     ];
//     console.log({ variant });
//     return (
//       <Element
//         className={mergeClasses(
//           textClasses({ size, weight, accent }),
//           className
//         )}
//       >
//         {children}
//       </Element>
//     );
//   }
// );
