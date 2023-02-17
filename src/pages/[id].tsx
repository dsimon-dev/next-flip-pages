import { useFlip } from "@/flip";
import { imageIds } from "@/images";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

export default function Image({ id }: { id: number }) {
  const { ref } = useFlip({ flipKey: id });

  return (
    <main style={{ padding: "100px", display: "grid", placeItems: "center" }}>
      <Link href="/">Home</Link>
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
