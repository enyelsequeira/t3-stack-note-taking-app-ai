// import * as ToastPrimitive from "@radix-ui/react-toast";
// import clsx from "clsx";
// import { useEffect, useState } from "react";

// type ToastOwnProps = {
//   title: string;
//   message: string;
//   kind: "success" | "error" | "warning" | "info";
//   open: boolean;
// };
// type ToastedProps = ToastOwnProps & ToastPrimitive.ToastProps;

// export const OwnToast = ({ title, message, ...props }: ToastedProps) => {
//   return (
//     <ToastPrimitive.Provider swipeDirection={"right"}>
//       <ToastPrimitive.Root
//         {...props}
//         className={clsx(
//           "fixed inset-x-4 bottom-4 z-50 w-auto rounded-lg shadow-lg md:top-4 md:right-4 md:left-auto md:bottom-auto md:w-full md:max-w-sm",
//           "bg-white dark:bg-gray-800",
//           "radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right",
//           "radix-state-closed:animate-toast-hide",
//           "radix-swipe-direction-right:radix-swipe-end:animate-toast-swipe-out-x",
//           "radix-swipe-direction-right:translate-x-radix-toast-swipe-move-x",
//           "radix-swipe-direction-down:radix-swipe-end:animate-toast-swipe-out-y",
//           "radix-swipe-direction-down:translate-y-radix-toast-swipe-move-y",
//           "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]",
//           "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
//         )}
//       >
//         <div className="flex">
//           <div className="flex w-0 flex-1 items-center py-4 pl-5">
//             <div className="radix w-full">
//               <ToastPrimitive.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                 {title}
//               </ToastPrimitive.Title>
//               <ToastPrimitive.Description className="mt-1 text-sm text-gray-700 dark:text-gray-400">
//                 {message}
//                 <span className="font-medium">repository/branch</span>
//               </ToastPrimitive.Description>
//             </div>
//           </div>
//         </div>
//       </ToastPrimitive.Root>

//       <ToastPrimitive.Viewport />
//     </ToastPrimitive.Provider>
//   );
// };

// export const makeToast = (props: ToastedProps) => {
//   return <OwnToast {...props} />;
// };

/* eslint-disable import/no-anonymous-default-export */
import {
  IconAlertCircle,
  IconCheck,
  IconInfoCircle,
  IconSlash,
  IconX,
} from "@tabler/icons";
import clsx from "clsx";
import type { FC } from "react";
import type { ToastOptions } from "react-hot-toast";
import toast, { Toaster, Toast } from "react-hot-toast";

export interface ToastOwnProps {
  title: string;
  message: string;
  kind: "success" | "error" | "warning" | "info";
  duration?: number;
  onComplete?: () => void;
}

export type MakeToastOptions = ToastOptions & ToastOwnProps;

export type ToastProps = Partial<Toast> & ToastOwnProps;
type ToastKind = "success" | "warning" | "error" | "info";

const iconToRender = (kind: ToastKind) => {
  switch (kind) {
    case "success":
      return <IconCheck width={16} />;
    case "warning":
      return <IconAlertCircle width={16} />;
    case "error":
      return <IconX width={16} />;
    case "info":
      return <IconInfoCircle width={16} />;
    default:
      return <IconInfoCircle width={16} />;
  }
};

const Toast: FC<ToastProps> = ({ kind = "success", visible, message }) => {
  const rootClass = clsx(`
   p-4 border flex  h-fit  rounded-[4px] bg-black 
    ${visible ? "animate-enter" : "animate-leave"}
  `);
  const kindClasses = {
    success: "border-[#DCFF1C] text-[#DCFF1C]",
    warning: "border-[#FFC700] text-[#FFC700]",
    error: "border-[#FF0000] text-[#FF0000]",
    info: "border-[#B8D9EE] text-[#B8D9EE]",
  };

  return (
    <div role="alert" className={clsx(rootClass, kindClasses[kind])}>
      <div className="flex items-center justify-center">
        <div className={clsx("flex h-4 w-4 items-center ", kindClasses[kind])}>
          {iconToRender(kind)}
        </div>
        <span
          className={clsx(
            "ml-2 text-sm font-normal  leading-4 ",
            kindClasses[kind]
          )}
        >
          {message}
        </span>
      </div>
    </div>
  );
};

export const makeToast = ({
  onComplete,
  title,
  message,
  kind,
  ...toasterOptions
}: MakeToastOptions) => {
  toast.custom(
    ({ visible, id }) => (
      <Toast
        id={id}
        kind={kind}
        onComplete={onComplete}
        title={title}
        message={message}
        visible={visible}
      />
    ),
    toasterOptions
  );
};
export default { Toaster };
