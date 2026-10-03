export default function Contact() {
  return (
    <>
      <p>
        feel free to reach out — i'm always happy to chat about opportunities,
        projects, or anything else.
      </p>

      {/* TODO: replace with your real email */}
      <p>
        email me at <a className="text-link" href="mailto:your-email@example.com">your-email@example.com</a>, or find me on:
      </p>

      <ul>
        <li><a className="text-link" href="https://github.com/kennyzcx">github</a></li>
        {/* TODO: replace URL */}
        <li><a className="text-link" href="https://twitter.com/your-handle">twitter</a></li>
        {/* TODO: replace URL */}
        <li><a className="text-link" href="https://www.linkedin.com/in/your-handle">linkedin</a></li>
      </ul>
    </>
  );
}
