import { useFlip } from "@/flip";
import { imageIds } from "@/images";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

export default function Image({ id }: { id: number }) {
  const { ref } = useFlip({ flipKey: id });

  return (
    <main style={{ padding: "100px", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <img
        ref={ref}
        src={`/images/${id}.jpg`}
        style={{
          display: "block",
          width: "40vw",
          height: "auto",
          aspectRatio: "1 / 1",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          maxWidth: "60ch",
          animationName: "slidein",
          animationDuration: "250ms",
          animationDelay: "250ms",
          animationFillMode: "forwards",
          opacity: 0,
        }}
      >
        <h1>Lorem Ipsum Dolor</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, eligendi, enim illo
          modi cum asperiores neque sit tempore, molestiae inventore iusto atque sequi laudantium
          velit reprehenderit doloribus voluptates hic ad!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, eligendi, enim illo
          modi cum asperiores neque sit tempore, molestiae inventore iusto atque sequi laudantium
          velit reprehenderit doloribus voluptates hic ad!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, eligendi, enim illo
          modi cum asperiores neque sit tempore, molestiae inventore iusto atque sequi laudantium
          velit reprehenderit doloribus voluptates hic ad!
        </p>
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: imageIds.map((id) => ({ params: { id: String(id) } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: { id: Number(params!.id) },
  };
};
