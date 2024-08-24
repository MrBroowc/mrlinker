/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "broowc/config/firebase";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    auth.signOut();
    router.push("/login");
  }, []);

  return;
}
