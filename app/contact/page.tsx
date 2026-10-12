export default function Contact() {
  return (
    <>
      <p className="mb-5">
        feel free to reach out — i'm always happy to chat about opportunities,
        projects, or anything else.
      </p>

      {/* TODO: replace with your real email */}
      <p className="mb-5">
        email me at <a className="text-link font-semibold" href="mailto:your-email@example.com">kt3062@nyu.edu</a>, or find me on:
      </p>

      <ul className="space-y-2">
        <li>
          <a className="text-link font-semibold" href="https://github.com/kennyzcx">github</a>
        </li>
        {/* TODO: replace URL */}
        <li>
          <a className="text-link font-semibold" href="https://twitter.com/your-handle">twitter</a>
        </li>
        {/* TODO: replace URL */}
        <li>
          <a className="text-link font-semibold" href="https://www.linkedin.com/in/kennyxtang">linkedin</a>
        </li>
      </ul>
    </>
  );
}
