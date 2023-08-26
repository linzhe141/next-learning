export default function Content({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-auto">
      <div className=" bg-gray-100 m-2 p-2 rounded">{children}</div>
    </div>
  );
}
