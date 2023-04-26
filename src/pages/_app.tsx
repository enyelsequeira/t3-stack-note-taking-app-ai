import { type AppType } from "next/app";
import { type Session } from "next-auth";

import { SessionProvider } from "next-auth/react";
import { Notifications } from "@mantine/notifications";

import { trpc } from "../utils/trpc";
import { MantineProvider } from "@mantine/core";
import "../styles/globals.css";
import RouterTransition from "@/components/RouteTransition";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS>
        <RouterTransition />
        <Notifications
          position="top-right"
          zIndex={2077}
          limit={5}
          autoClose={3000}
        />
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
