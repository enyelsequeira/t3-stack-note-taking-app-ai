/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type ValidVariantTypes = string | number | null | boolean | undefined;
type Variants = Record<string, ValidVariantTypes | ValidVariantTypes[]> & {
  className: string;
};

/**
 * Lets you use arrays for variants as well. This util combines all possible
 * variants and returns an array with all possible options. Simply
 * spread this in the compoundVariants.
 */
export const applyStyleToMultipleVariants = (variants: Variants) => {
  const allKeysThatAreArrays = Object.keys(variants).filter((key) =>
    Array.isArray(variants[key])
  );
  const allKeysThatAreNotArrays = Object.keys(variants).filter(
    (key) => !Array.isArray(variants[key])
  );
  // Creates an object of all static options, ready to be merged in later with the array values.
  const nonArrayOptions = allKeysThatAreNotArrays.reduce((acc, key) => {
    return { ...acc, [key]: variants[key] };
  }, {});

  // Creates an array of all possible combinations of the array values.
  // Eg if the variants object is { color: ["blue", "red"], size: ["small", "medium"] }
  // then the result will be:
  // [
  //   { color: "blue", size: "small" },
  //   { color: "blue", size: "medium" },
  //   { color: "red", size: "small" },
  //   { color: "red", size: "medium" },
  // ]
  const cartesianProductOfAllArrays = cartesianProduct(
    allKeysThatAreArrays.map((key) => variants[key]) as ValidVariantTypes[][]
  );

  return cartesianProductOfAllArrays.map((variant) => {
    const variantObject = variant.reduce((acc, value, index) => {
      // @ts-ignore
      return { ...acc, [allKeysThatAreArrays[index]]: value };
    }, {});

    return {
      ...nonArrayOptions,
      ...variantObject,
    };
  });
};

/**
 * A cartesian product is a final array that combines multiple arrays in ALL
 * variations possible. For example:
 *
 * You have 3 arrays: [a, b], [1, 2], [y, z]
 * The final result will be an array with all the different combinations:
 * ["a", 1, "y"], ["a", 1, "z"], ["a", 2, "y"], ["a", 2, "z"], ["b", 1, "y"], etc
 *
 * We use this to create a params object for the static pages that combine multiple
 * dynamic properties like 'stage' and 'meansOfTransport'. Resulting in an array
 * with all different path combinations possible.
 *
 * @source: https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
 * TS Inspiration: https://gist.github.com/ssippe/1f92625532eef28be6974f898efb23ef
 */
export const cartesianProduct = <T extends ValidVariantTypes>(sets: T[][]) =>
  sets.reduce<T[][]>(
    (accSets, set) =>
      accSets.flatMap((accSet) => set.map((value) => [...accSet, value])),
    [[]]
  );

export const classNames = (...classes: unknown[]) => {
  return classes.filter(Boolean).join(" ");
};

/**
 *
 * @param classes - class names
 * @returns {string} - class names joined by space
 */

export function mergeClasses(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}
