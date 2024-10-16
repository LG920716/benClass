export default function Page({ params }: { params: { name: string } }) {
  return <div>組員名稱: {params.name}</div>;
}
