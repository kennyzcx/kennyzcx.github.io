import Link from "next/link";

export default function About() {
  return (
    <>
      <p className="greeting">hi, 你好</p>
      <p className="pronouns">[ he/him ]</p>

      {/* TODO: your school/degree */}
      <p>
        i'm currently a computer science major at new york university. i have a
        passion for coding, learning, and building.
      </p>

      {/* TODO: your hobbies */}
      <p>
        when i'm not programming you can catch me lounging around, trying new
        restaurants, and staring at other people's dogs.
      </p>

      <p>
        i still have much more to learn, and i'm always open to exploring new
        opportunities, <Link href="/contact/" className="text-link">connect with me here.</Link>
      </p>
    </>
  );
}
