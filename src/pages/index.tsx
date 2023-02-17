import { useFlip } from "@/flip";
import { imageIds } from "@/images";
import Link from "next/link";

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
  const { ref } = useFlip({ flipKey: id });

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
        }}
      />
    </Link>
  );
}
