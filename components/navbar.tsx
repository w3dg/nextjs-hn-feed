"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="text-sm md:text-lg flex gap-1 items-center w-full px-4 py-3 bg-accent text-secondary-foreground">
      <Link
        href="/top"
        className={cn("text-accent-foreground font-bold hover:underline px-2 py-1 md:px-4 md:py-3", {
          "bg-neutral-100/10 rounded-lg": pathname === "/top",
        })}
      >
        Hackernews
      </Link>
      <Link
        href="/new"
        className={cn("hover:underline p-1 md:px-4 md:py-3", { "bg-neutral-100/10 rounded-lg": pathname === "/new" })}
      >
        new
      </Link>
      <Link
        href="/show"
        className={cn("hover:underline p-1 md:px-4 md:py-3", { "bg-neutral-100/10 rounded-lg": pathname === "/show" })}
      >
        show
      </Link>
      <Link
        href="/ask"
        className={cn("hover:underline p-1 md:px-4 md:py-3", { "bg-neutral-100/10 rounded-lg": pathname === "/ask" })}
      >
        ask
      </Link>
      <Link
        href="/jobs"
        className={cn("hover:underline p-1 md:px-4 md:py-3", { "bg-neutral-100/10 rounded-lg": pathname === "/jobs" })}
      >
        jobs
      </Link>
    </nav>
  );
}

export default Navbar;
