export default function Page({ params }: { params: { id: number } }) {
  return <div>產品編號: {params.id}</div>;
}
