"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ResumeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4">
    <rect
      x="3.5"
      y="3.5"
      width="17"
      height="17"
      rx="3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="9.9" cy="8.4" r="1.85" fill="currentColor" />
    <path d="M6.9 13.3c0-2.1 6-2.1 6 0z" fill="currentColor" />
    <rect x="6.9" y="15.1" width="10.2" height="1.9" rx="0.95" fill="currentColor" />
    <rect x="6.9" y="17.9" width="10.2" height="1.9" rx="0.95" fill="currentColor" />
  </svg>
);

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
          <ResumeIcon />
        </Link>
      </nav>
    </header>
  );
}
