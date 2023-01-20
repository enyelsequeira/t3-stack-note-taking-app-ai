import type { ReactElement } from "react";
import React, { Children, forwardRef } from "react";
import clsx from "clsx";
import { Tab } from "@headlessui/react";
import type { PolymorphicPropsWithoutRef } from "../utils/types";

export interface TabsOwnProps {
  children: React.ReactNode;
  tabListClassName?: string;
  buttonClassName?: string;
  tabClassName?: string;
  tabsPanelsClassName?: string;
  tabPanelClassName?: string;
  TabChildren: React.ReactNode;
}
const DEFAULT_TAG = "div";
const TabComponent = forwardRef(
  <C extends React.ElementType = typeof DEFAULT_TAG>({
    as,
    children,
    tabListClassName,
    buttonClassName,
    tabPanelClassName,
    TabChildren,
    tabsPanelsClassName,
    ...otherProps
  }: PolymorphicPropsWithoutRef<TabsOwnProps, C>) =>
    // might delete this later
    {
      const childrenArray = Children.toArray(children) as ReactElement[];

      return (
        <Tab.Group as="div" manual vertical {...otherProps}>
          <Tab.List className={tabListClassName}>
            {/* map through the children array each will take a title prop */}

            {childrenArray.map((child) => {
              return (
                <Tab
                  as="button"
                  // disabled={child.props.title === 'Coming soon'}
                  key={child?.key}
                  className={({ selected }) =>
                    clsx(
                      selected
                        ? "border-teal-500 bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                        : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
                    )
                  }
                  {...child.props}
                >
                  {TabChildren}
                </Tab>
              );
            })}
          </Tab.List>
          <Tab.Panels className={tabsPanelsClassName}>
            {childrenArray.map((child) => {
              return (
                <Tab.Panel className={tabPanelClassName} key={child?.key}>
                  {child?.props.children}
                </Tab.Panel>
              );
            })}
          </Tab.Panels>
        </Tab.Group>
      );
    }
);

TabComponent.displayName = "TabComponent";
export default TabComponent;
