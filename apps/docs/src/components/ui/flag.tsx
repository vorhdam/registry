"use client";

import * as React from "react";

import { countryList } from "@/lib/geo";

export type FlagCode = (typeof countryList)[number];

interface FlagProps extends React.SVGProps<SVGSVGElement> {
  code: FlagCode;
}

const flagCache = new Map<string, { viewBox: string; content: string }>();

async function loadFlag(code: string) {
  const cached = flagCache.get(code);
  if (cached) return cached;

  const response = await fetch(
    `https://cdn.jsdelivr.net/npm/@nordaun/flags@latest/flags/${code}.svg`,
  );
  const text = await response.text();
  const svg = new DOMParser()
    .parseFromString(text, "image/svg+xml")
    .querySelector("svg");

  if (!svg) throw new Error(`Invalid flag SVG: ${code}`);

  const parsed = {
    viewBox: svg.getAttribute("viewBox") ?? "0 0 36 36",
    content: svg.innerHTML,
  };

  flagCache.set(code, parsed);
  return parsed;
}

function Flag({ code, className, viewBox, ...props }: FlagProps) {
  const formattedCode = code?.toLowerCase();
  const [flag, setFlag] = React.useState(
    () => flagCache.get(formattedCode) ?? null,
  );

  React.useEffect(() => {
    let cancelled = false;

    loadFlag(formattedCode)
      .then((parsed) => {
        if (!cancelled) setFlag(parsed);
      })
      .catch(() => {
        if (!cancelled) setFlag(null);
      });

    return () => {
      cancelled = true;
    };
  }, [formattedCode]);

  return (
    <svg
      className={className}
      viewBox={viewBox ?? flag?.viewBox ?? "0 0 36 36"}
      aria-hidden
      dangerouslySetInnerHTML={flag ? { __html: flag.content } : undefined}
      {...props}
    />
  );
}

export { Flag };
