import { redirect } from "next/navigation";

export default function Login() {
  return redirect("/api/auth/signin");
}
