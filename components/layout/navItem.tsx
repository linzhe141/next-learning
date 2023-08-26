import { useRouter } from "next/navigation";
type Props = {
  label: string;
  url: string;
  level: number;
  children?: Props[];
};
export default function NavItem({ label, url, level, children }: Props) {
  const router = useRouter();
  return (
    <div className="">
      <div
        className="hover:bg-green-200 cursor-pointer leading-10"
        style={{ paddingLeft: 16 * level + "px" }}
        onClick={()=>router.push(url)}
      >
        {label}
      </div>
      {children?.map((subNav) => (
        <NavItem {...subNav} key={subNav.url} />
      ))}
    </div>
  );
}
