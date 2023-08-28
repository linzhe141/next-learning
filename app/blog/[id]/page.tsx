export default function Test({ params }: { params: { id: string } }) {
  return (
    <div>
      <div>My Post: {params.id}</div>
    </div>
  )
}
