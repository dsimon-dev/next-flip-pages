import { fadeInAppearStyles } from "@/animations";
import { useFlip } from "@/flip";
import { imageIds } from "@/images";
import Link from "next/link";
import { CSSProperties, useState } from "react";

export default function Home() {
  return (
    <main style={{ padding: "5vw" }}>
      <h1 style={{ marginBottom: "50px" }}>Lorem Ipsum Dolor</h1>
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
      <img
        ref={ref}
        src={`/images/${id}.jpg`}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          aspectRatio: "1 / 1",
          objectFit: "cover",
        }}
      />
    </Link>
  );
}
