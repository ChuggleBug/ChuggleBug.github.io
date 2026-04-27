
import Link from "next/link";

export default function Home() {
  
  return (
    <div >
        <h1>There is nothing here</h1>
        <h1>please click this button</h1>

        {/* 
          Blog is not managed by Next.js. 
          Would be unable to prefetch during development
        */}
        <a href="/blog/">Blog</a>

        <h1>look some other button</h1>
        <h1>hi</h1>
        <Link href='/soup/'> soup </Link>

    </div>
  );
}
