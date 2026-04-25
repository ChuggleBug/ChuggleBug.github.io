import Link from "next/link";

export default function Home() {
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
        <h1>There is nothing here</h1>
        <h1>please click this button</h1>

        {/* 
          Blog is not managed by Next.js. 
          Would be unable to prefetch during development
        */}
        <a href="/blog/">Blog</a>

        <h1>look some other button</h1>
        <Link href='/soup/'> soup </Link>

    </div>
  );
}
