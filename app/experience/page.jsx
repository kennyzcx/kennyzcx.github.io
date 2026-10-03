import FlowersCanvas from "../../components/FlowersCanvas";

export default function Experience() {
  return (
    <>
      <FlowersCanvas />

      {/* TODO: replace with your real experience entries */}
      <div className="entry">
        <h2>placeholder Role</h2>{" "}
        <span className="entry-meta">— placeholder Company, 2024–present</span>
        <ul>
          <li>describe what you did and the impact it had.</li>
          <li>mention technologies, tools, or teams you worked with.</li>
        </ul>
      </div>

      <div className="entry">
        <h2>another Role</h2>{" "}
        <span className="entry-meta">— another Org, 2023–2024</span>
        <ul>
          <li>one or two concise bullet points about the work.</li>
          <li>quantify results where you can.</li>
        </ul>
      </div>
    </>
  );
}
