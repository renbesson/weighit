import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <pre>{process.env.VERCEL_URL}</pre>
    </main>
  );
}
