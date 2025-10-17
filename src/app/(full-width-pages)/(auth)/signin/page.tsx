import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js SignIn Page | Single Throw Maritime - Maritime Operations Dashboard",
  description: "This is Next.js Signin Page Single Throw Maritime Dashboard",
};

export default function SignIn() {
  return <SignInForm />;
}
