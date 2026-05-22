"use client";

import { Logo } from "@/components/blocks/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useColor } from "@nordaun/color";
import { useTheme } from "@nordaun/theme";
import { config } from "@repo/config";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { color, setColor } = useColor();

  return (
    <header className="flex items-center md:justify-between justify-center w-dvw py-2 px-8 h-14 sticky top-0 z-50 bg-background">
      <div className="absolute top-14 h-5 bg-linear-to-b from-background to-transparent z-50 w-dvw" />
      <div className="not-md:hidden">
        <Link href="/" className="flex flex-row items-center h-3.5 gap-1">
          <Logo />
          <span className="select-none text-lg">/ui</span>
        </Link>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              render={<Link href="/components">Components</Link>}
            />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              render={<Link href="/packages">Packages</Link>}
            />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              render={<Link href="/about">About</Link>}
            />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              render={<Link href={config.github.project}>Github</Link>}
            />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex flex-row gap-2.5 not-md:hidden items-center">
        <Button
          variant={"ghost"}
          className={"rounded-full size-10 p-0"}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </Button>
        <Select value={color}>
          <SelectTrigger className="flex justify-center items-center h-10 hover:bg-muted dark:hover:bg-muted/50 rounded-full cursor-pointer">
            <div className="flex flex-row items-center gap-2">
              <div className="bg-primary size-3 rounded-full" />
              <span>Select a color</span>
            </div>
          </SelectTrigger>
          <SelectContent className="p-1">
            {config.colors.map((c) => (
              <SelectItem key={c} value={c} onClick={() => setColor(c)}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}
