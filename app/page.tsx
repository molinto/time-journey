import { rawData } from "@/lib/originalQuestions";
export default function Home() {
  const urlarray: string[] = [];
  const urls = rawData.map((q) => {
    const url = q.URL.split("//")[1].split("/")[0];

    if (url && !urlarray.includes(url)) {
      urlarray.push(url);
    }
    return url;
  });

  return <div className="flex h-full items-center justify-center"></div>;
}
