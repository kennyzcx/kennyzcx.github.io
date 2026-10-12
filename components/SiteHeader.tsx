"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();

  // exact match on the slash-normalized path: only the current page lights up
  const cls = (href: string) =>
    pathname.replace(/\/$/, "") === href.replace(/\/$/, "")
      ? "text-accent"
      : "hover:text-accent";

  return (
    <header className="flex flex-row justify-between items-start">
      <Link className="site-name hover:text-accent" href="/">
        kenny tang
      </Link>
      <nav className="site-nav flex flex-col items-end gap-1 text-right">
        <Link href="/experience" className={`font-semibold ${cls("/experience")}`}>
          experience
        </Link>
        <Link href="/aboutme" className={`font-semibold ${cls("/aboutme")}`}>
          about
        </Link>
        <Link href="/contact" className={`font-semibold ${cls("/contact")}`}>
          contact
        </Link>
        <Link
          href="/resume"
          className={`font-normal text-neutral-500 inline-flex items-center gap-1.5 hover:text-accent ${cls("/resume")}`}
        >
          resume
          <img src="/resume.svg" alt="" className="w-4 h-4" />
        </Link>
      </nav>
    </header>
  );
}
