import AppLayout from "@/components/layout/appLayout";

export default function Test({ params }: { params: { id: string } }) {
  return (
    <AppLayout>
      <div>
        <div>My Post: {params.id}</div>
      </div>
    </AppLayout>
  );
}
