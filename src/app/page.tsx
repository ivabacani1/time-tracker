import { redirect } from "next/navigation";
import RootLayout from "./layout";

export default function Home() {
  return redirect("/trackers");
}
