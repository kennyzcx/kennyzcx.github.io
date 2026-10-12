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
        <h2 className="inline font-bold">incoming software engineer intern</h2>{" "}
        <span className="text-neutral-500">— tbd</span>
        <ul className="list-disc ml-5 mt-1.5">
          <li>role details to come.</li>
          <li>more bullets as things are finalized.</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="inline font-bold">incoming product management intern</h2>{" "}
        <span className="text-neutral-500">— tbd</span>
        <ul className="list-disc ml-5 mt-1.5">
          <li>role details to come.</li>
          <li>more bullets as things are finalized.</li>
        </ul>
      </div>
    </>
  );
}
