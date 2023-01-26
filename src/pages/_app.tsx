import { type AppType } from "next/app";
import { type Session } from "next-auth";

import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { useNProgress } from "@tanem/react-nprogress";

import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import clsx from "clsx";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();

  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  });

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }));
    };

    const handleRouteChangeEnd = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }));
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeEnd);
    router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeEnd);
      router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  }, [router.events]);
  return (
    <SessionProvider session={session}>
      <Toaster position="top-center" />
      <Loading isRouteChanging={state.isRouteChanging} key={state.loadingKey} />

      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

const Loading: React.FC<{ isRouteChanging: boolean }> = ({
  isRouteChanging,
}) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating: isRouteChanging,
  });

  return (
    <>
      <div
        style={{
          opacity: isFinished ? 0 : 1,
          pointerEvents: "none",
          transition: `opacity ${animationDuration}ms linear`,
        }}
      >
        <div
          style={{
            background: "#29d",
            height: "2px",
            left: "0",
            marginLeft: `${(-1 + progress) * 100}%`,
            position: "fixed",
            top: "0",
            transition: `margin-left ${animationDuration}ms linear`,
            width: "100%",
            zIndex: 1031,
          }}
        >
          <div
            style={{
              boxShadow: "0 0 10px #29d, 0 0 5px #29d",
              display: "block",
              height: "100%",
              opacity: 1,
              position: "absolute",
              right: "0",
              transform: "rotate(3deg) translate(0px, -4px)",
              width: "100px",
            }}
          />
        </div>
      </div>
    </>
  );
};
