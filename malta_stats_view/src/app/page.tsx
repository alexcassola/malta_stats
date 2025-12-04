import PageDescriptors from "@/components/home/PageDescriptors";


export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <section>
        <h1>Intro</h1>
        <p>Some info about the page</p>
      </section>
      <PageDescriptors />
    </div>
  );
}
