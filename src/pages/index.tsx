import { useFlip } from "@/flip";
import { imageIds } from "@/images";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  return (
    <main style={{ padding: "100px" }}>
      <h1 style={{ marginBottom: "50px" }}>Images</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "25px" }}>
        {imageIds.map((id) => (
          <Item key={id} id={id} />
        ))}
      </div>
    </main>
  );
}

function Item({ id }: { id: number }) {
  const [opacity, setOpacity] = useState(0);
  const [transition, setTransition] = useState<string>();
  const [animationName, setAnimationName] = useState<string | undefined>("fadein");

  const { ref } = useFlip({
    flipKey: id,
    onAnimationStart: () => {
      setOpacity(1);
      // setAnimationName(undefined);
    },
    onCancel: () => {
      setOpacity(1);
      setTransition("opacity 250ms ease 250ms");
    },
  });

  return (
    <Link href={`/${id}`}>
      <img
        ref={ref}
        src={`/images/${id}.jpg`}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          aspectRatio: "1 / 1",
          objectFit: "cover",
          transition,
          opacity,
          // animationName,
          // animationDelay: "250ms",
          // animationDuration: "250ms",
          // animationFillMode: "forwards",
        }}
      />
    </Link>
  );
}
