import FlowersCanvas from "@/components/FlowersCanvas";

export default function Experience() {
  return (
    <>
      <FlowersCanvas />

      <p className="mb-8">
        i'm interested in swe, hardware, and product management roles.
      </p>

      {/* TODO: replace with your real experience entries */}
      <div className="mb-8">
        <h2 className="inline font-bold">placeholder Role</h2>{" "}
        <span className="text-neutral-500">— placeholder Company, 2024–present</span>
        <ul className="list-disc ml-5 mt-1.5">
          <li>describe what you did and the impact it had.</li>
          <li>mention technologies, tools, or teams you worked with.</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="inline font-bold">another Role</h2>{" "}
        <span className="text-neutral-500">— another Org, 2023–2024</span>
        <ul className="list-disc ml-5 mt-1.5">
          <li>one or two concise bullet points about the work.</li>
          <li>quantify results where you can.</li>
        </ul>
      </div>
    </>
  );
}
