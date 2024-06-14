import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex gap-2 items-center w-full p-4 bg-accent text-secondary-foreground">
      <Link href="/" className="text-slate-300 font-bold hover:underline">
        Hackernews
      </Link>
      <Link href="/newest" className="hover:underline">
        new
      </Link>
      <Link href="/show" className="hover:underline">
        show
      </Link>
      <Link href="/ask" className="hover:underline">
        ask
      </Link>
      <Link href="/jobs" className="hover:underline">
        jobs
      </Link>
    </nav>
  );
}

export default Navbar;
