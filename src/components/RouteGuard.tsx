"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Button, Column, Flex, Heading, PasswordInput, Spinner } from "@once-ui-system/core";

import { protectedRoutes, routes, stripLocale } from "@/resources";
import NotFound from "@/app/[locale]/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

const DYNAMIC_ROUTES = ["/work"] as const;

/**
 * Gates routes that are disabled in config or password protected.
 *
 * Both questions are answered synchronously from config, so an ordinary page
 * renders its children on the very first pass — including on the server. Only
 * a genuinely protected route waits on the network, and only that route ever
 * shows a spinner. Blocking every page behind a `loading` state would strip the
 * content out of the server HTML and hand crawlers an empty page.
 */
const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname() ?? "";

  // The route config is locale-agnostic, so compare against the path with any
  // locale prefix removed — otherwise /fr/about matches nothing and 404s.
  const route = stripLocale(pathname);

  const isRouteEnabled = useMemo(() => {
    if (!route) return false;

    if (route in routes) {
      return routes[route as keyof typeof routes];
    }

    return DYNAMIC_ROUTES.some((prefix) => route.startsWith(prefix) && routes[prefix]);
  }, [route]);

  const isPasswordRequired = Boolean(protectedRoutes[route as keyof typeof protectedRoutes]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(isPasswordRequired);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isPasswordRequired) {
      setCheckingAuth(false);
      return;
    }

    let cancelled = false;
    setCheckingAuth(true);
    setIsAuthenticated(false);

    fetch("/api/check-auth")
      .then((response) => {
        if (!cancelled) setIsAuthenticated(response.ok);
      })
      .catch(() => {
        if (!cancelled) setIsAuthenticated(false);
      })
      .finally(() => {
        if (!cancelled) setCheckingAuth(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isPasswordRequired, route]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (!isRouteEnabled) {
    return <NotFound />;
  }

  if (isPasswordRequired) {
    if (checkingAuth) {
      return (
        <Flex fillWidth paddingY="128" horizontal="center">
          <Spinner />
        </Flex>
      );
    }

    if (!isAuthenticated) {
      return (
        <Column paddingY="128" maxWidth={24} gap="24" center>
          <Heading align="center" wrap="balance">
            This page is password protected
          </Heading>
          <Column fillWidth gap="8" horizontal="center">
            <PasswordInput
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              errorMessage={error}
            />
            <Button onClick={handlePasswordSubmit}>Submit</Button>
          </Column>
        </Column>
      );
    }
  }

  return <>{children}</>;
};

export { RouteGuard };
