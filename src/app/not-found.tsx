import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div>404 Not Found</div>
      <div>
        Go <Link href="/">Home</Link>
      </div>
    </>
  );
}
