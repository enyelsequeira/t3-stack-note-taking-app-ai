import type * as React from "react";

/**
 * @desc Utility type for getting props type of React component.
 * @source https://github.com/emotion-js/emotion/blob/main/packages/react/types/helper.d.ts
 * It takes `defaultProps` into an account - making props with defaults optional.
 */
export type PropsOfWithRef<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C>>;

export type PropsWithoutRef<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>;

export type PropsWithAs<P, T extends React.ElementType> = P & { as?: T };

/**
 * Allows merging a set of omitted props `T` by
 * overriding another set of props `U`you
 * Omits it props are repeated in `U`
 */
export type MergeProps<T, U> = Omit<T, keyof U> & U;

/** Extracts the `ref` prop from a polymorphic component */
export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

/**
 * Allows inheritance of props from a specified generic component `C`
 * which are merged with custom props `P`, excluding `ref`
 */
export type PolymorphicPropsWithoutRef<
  P,
  C extends React.ElementType
> = MergeProps<
  C extends keyof JSX.IntrinsicElements
    ? React.PropsWithoutRef<JSX.IntrinsicElements[C]>
    : PropsWithoutRef<C>,
  PropsWithAs<P, C>
>;

/**
 * Allows inheritance of props from a specified generic component `C`
 * which are merged with custom props `P`, including `ref`
 */
export type PolymorphicPropsWithRef<
  P,
  C extends React.ElementType
> = MergeProps<
  C extends keyof JSX.IntrinsicElements
    ? React.PropsWithRef<JSX.IntrinsicElements[C]>
    : PropsOfWithRef<C>,
  PropsWithAs<P, C>
>;

export type PolymorphicExoticComponent<
  P,
  C extends React.ElementType
> = MergeProps<
  React.ExoticComponent<P & { [key: string]: unknown }>,
  {
    /**
     * Exotic Components are not callable
     */
    <InstanceC extends React.ElementType = C>(
      props: PolymorphicPropsWithoutRef<P, InstanceC>
    ): React.ReactElement | null;
  }
>;

/**
 * This is a wrapper around `ForwardRef` and the `PolymorphicExoticComponent`
 * you using this to use forwardref
 */
export type PolymorphicForwardRefExoticComponent<
  P,
  C extends React.ElementType
> = MergeProps<
  React.ForwardRefExoticComponent<P & { [key: string]: unknown }>,
  PolymorphicExoticComponent<P, C>
>;
