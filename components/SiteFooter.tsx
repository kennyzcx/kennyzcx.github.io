export default function SiteFooter() {
  return (
    <footer className="mt-20 flex gap-5">
      <a href="https://github.com/kennyzcx" aria-label="GitHub">
        <img src="/github.svg" alt="" className="w-[22px] h-[22px]" />
      </a>
      <a href="https://twitter.com/your-handle" aria-label="Twitter">
        {/* TODO: replace with your Twitter/X URL */}
        <img src="/twitter.svg" alt="" className="w-[22px] h-[22px]" />
      </a>
      <a href="https://www.linkedin.com/in/your-handle" aria-label="LinkedIn">
        {/* TODO: replace with your LinkedIn URL */}
        <img src="/linkedin.svg" alt="" className="w-[22px] h-[22px]" />
      </a>
    </footer>
  );
}
