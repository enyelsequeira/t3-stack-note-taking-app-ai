import type { VariantProps } from "cva";
import { cva } from "cva";
import * as React from "react";
import { mergeClasses } from "../CVA";
import type {
  PolymorphicPropsWithoutRef,
  PolymorphicRef,
} from "../utils/types";

export interface BoxOwnProps {
  children: React.ReactNode;
}

const DEFAULT_ELEMENT = "div";

const boxClasses = cva("", {
  variants: {
    container: {
      true: "mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40",
    },
  },
});
type InferredVariantProps = VariantProps<typeof boxClasses>;

type BoxProps = InferredVariantProps & BoxOwnProps;

/**
 * UI Component
 * @description
 * This is the most basic component that is used to create a section the default tag is `div` but you can change it to any other tag
 * however you should beware when changing the tag to  `a` tag this will cause the component to be rendered as a link
 * but the functionality of the link will be disabled and you will have to add the functionality yourself, you can of course extends the props
 *  @example usage of the component
 *   ```
 *   <Box as="section>
 *     <div>Content</div>
 *     <div>Content</div>
 *   </Box>
 *   ```
 */

const Box = React.forwardRef(
  <C extends React.ElementType = typeof DEFAULT_ELEMENT>(
    {
      as,
      children,
      className,
      container,
      ...otherProps
    }: PolymorphicPropsWithoutRef<BoxProps, C>,
    ref: PolymorphicRef<C>
  ) => {
    const Element = as ?? DEFAULT_ELEMENT;

    return (
      <Element
        ref={ref}
        // this is the way to add a class to a component, if className exits or one of the variants exits then add the class
        {...((className || container) && {
          className: mergeClasses(boxClasses({ container }), className),
        })}
        {...otherProps}
      >
        {children && children}
      </Element>
    );
  }
);

export default Box;

//display name
Box.displayName = "Box";
