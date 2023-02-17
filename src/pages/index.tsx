import { fadeInAppearStyles } from "@/animations";
import { useFlip } from "@/flip";
import { imageIds } from "@/images";
import Link from "next/link";
import { CSSProperties, useState } from "react";

export default function Home() {
  return (
    <main style={{ padding: "5vw" }}>
      <h1 style={{ marginBottom: "25px" }}>Dense Green Growth</h1>
      <p style={{ marginBottom: "50px" }}>
        Plant photos taken from the{" "}
        <a
          href="https://unsplash.com/collections/3333421/dense-green-growth"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dense Green Growth
        </a>{" "}
        Unsplash collection.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "25px",
        }}
      >
        {imageIds.map((id) => (
          <Item key={id} id={id} />
        ))}
      </div>
    </main>
  );
}

function Item({ id }: { id: number }) {
  const [styles, setStyles] = useState<CSSProperties>(fadeInAppearStyles);

  const { ref } = useFlip({
    flipKey: id,
    onAnimationStart: () => setStyles({}),
  });

  return (
    <Link href={`/${id}`} style={styles}>
      <img ref={ref} src={`/images/${id}.jpg`} />
    </Link>
  );
}
