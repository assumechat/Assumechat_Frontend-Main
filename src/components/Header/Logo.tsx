import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex flex-col">
      <div className="text-2xl font-bold text-[#B30738]">
        <Link href="/">AssumeChat</Link>
      </div>
    </div>
  );
}
