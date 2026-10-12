import Link from "next/link";

export default function About() {
  return (
    <>
      {/* TODO: greeting/pronouns if you want to tweak them */}
      <p className="greeting font-bold text-accent mb-1.5 text-lg">hi, 你好</p>
      <p className="mb-10 text-lg">[ he/him ]</p>

      {/* TODO: your school/degree */}
      <p className="mb-5">
        i'm currently an electrical & computer engineering major minoring in finance
        at new york university. i have a passion for coding, learning, and building.
        i'm interested in swe, hardware, and product management roles.
      </p>

      {/* TODO: your hobbies */}
      <p className="mb-5">
        when i'm not programming you can catch me lounging around, going to 
        luma events, and staring at other people's dogs.
      </p>

      <p>
        i still have so much more to learn, and i'm always open to exploring new
        opportunities, <Link href="/contact" className="text-link font-semibold">connect with me here.</Link>
      </p>
    </>
  );
}
