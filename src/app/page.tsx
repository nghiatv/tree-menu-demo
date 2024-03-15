import { Sidebar } from "@/components/app/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="hidden md:block">
        <div className="grid lg:grid-cols-5">
          <Sidebar playlists={[]} className="hidden lg:block" />
          <div className="col-span-3 lg:col-span-4 lg:border-l"></div>
        </div>
      </div>
    </main>
  );
}
