"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ResumeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" aria-hidden="true">
    <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.45 216.62l-58.99 58.73c-6.25 6.23-16.4 6.23-22.64 0l-58.99-58.73c-5.02-5-1.45-13.62 5.67-13.62h40.51L192 312.75V160h50.62v152.24l-1.51 27.49h40.67c7.12 0 10.69 8.62 5.67 13.62z" />
  </svg>
);

export default function SiteHeader() {
  const pathname = usePathname();

  const cls = (href) =>
    pathname.replace(/\/$/, "") === href.replace(/\/$/, "") ? "current" : "";

  return (
    <header className="site-header">
      <Link className="site-name" href="/">
        kenny tang
      </Link>
      <nav className="site-nav">
        <Link href="/experience/" className={cls("/experience/")}>
          experience
        </Link>
        <Link href="/" className={cls("/")}>
          about
        </Link>
        <Link href="/contact/" className={cls("/contact/")}>
          contact
        </Link>
        <Link href="/resume/" className={`resume-link ${cls("/resume/")}`}>
          resume
          <ResumeIcon />
        </Link>
      </nav>
    </header>
  );
}
