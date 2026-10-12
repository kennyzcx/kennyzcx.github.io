import { redirect } from "next/navigation";

export default function Home() {
  // the about page lives at /aboutme; the root bounces there
  redirect("/aboutme");
}
