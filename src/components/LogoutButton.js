import React from "react";
import { message } from "antd";
import { useRouter } from "next/router";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "broowc/context/AuthContext";
import { auth } from "broowc/config/firebase";
export default function LogoutButton() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const out = () => {
    auth.signOut();
    router.push("/login");
    message.success("Berhasil Logout!");
    localStorage.removeItem("user_broowc_linker");
  };
  return (
    currentUser && (
      <button onClick={out} className="m-0 flex items-center gap-2">
        <LogoutOutlined /> Sign Out
      </button>
    )
  );
}
