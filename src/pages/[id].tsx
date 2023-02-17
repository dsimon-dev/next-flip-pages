import { imageIds } from "@/images";
import { GetStaticPaths, GetStaticProps } from "next";

export default function Image({ id }: { id: number }) {
  return (
    <main style={{ padding: "100px" }}>
      <img
        src={`/images/${id}.jpg`}
        style={{
          display: "block",
          width: "50vw",
          height: "80vh",
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