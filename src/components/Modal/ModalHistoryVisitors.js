/* eslint-disable @next/next/no-img-element */
import { Modal } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { PARAMS } from "broowc/constants/constants";
import { useAppContext } from "broowc/context/AppContext";
import { useAuth } from "broowc/context/AuthContext";
import { GetCountVisitors } from "broowc/utils/getCountVisitors";
import { GetSubCollection, getUser } from "broowc/utils/helpers";

export default function ModalHistoryVisitors(props) {
  const router = useRouter();
  const { currentUser } = useAuth();
  const user = getUser("uid", currentUser?.uid);
  const historyVisitors = GetSubCollection(
    `users/${user?.id}/history_visitors`,
    {
      orderBy: ["createdAt", "desc"],
      limit: 50,
    }
  );
  const { dispatch } = useAppContext();
  const handleOnCancel = () => {
    dispatch({ type: PARAMS.SET_MODAL_HISTORY_VISITORS, value: false });
  };
  return (
    <Modal
      title={
        <div className="text-center">
          <p className="m-0 text-lg">History Visitors</p>
          <p className="text-gray-500">
            Get more visitors by sharing your Linker everywhere.
          </p>
        </div>
      }
      footer={null}
      open={props.show}
      style={{
        bottom: 0,
      }}
      centered
      onCancel={handleOnCancel}
      keyboard
    >
      <div className="text-base mt-7">
        {historyVisitors.map((document, i) => (
          <div
            key={i}
            className="flex justify-between items-center pb-5 w-full"
          >
            <span className="flex items-center gap-2 text-lg font-semibold">
              <img
                src={document.data().photoURL}
                className="rounded-full w-10"
                alt=""
              />{" "}
              <div className="">
                {document.data().uid !== props.user.data().uid
                  ? document.data().profile_title
                  : "You"}
                <p className="m-0 text-xs text-gray-500">
                  {dayjs
                    .unix(document.data().createdAt.seconds)
                    .format("hh:mm A - DD MMMM YYYY")}
                </p>
              </div>
            </span>
            <div className="text-center">
              {document.data().username && (
                <Link
                  href={`${process.env.NEXT_PUBLIC_SITE_URL}/u/${
                    document.data().username
                  }`}
                  target="_blank"
                  className="hover:text-black cursor-pointer bg-gray-600 text-white border rounded-md px-3 py-2 text-base font-semibold"
                >
                  Visit
                </Link>
              )}
            </div>
          </div>
        ))}
        <p className="border-b font-semibold">
          Total Visitors : {GetCountVisitors()}
        </p>
        <div
          onClick={() => {
            router.push("/admin/account");
            handleOnCancel();
          }}
          className="cursor-pointer text-center font-bold mt-5 bg-gray-700 py-3 rounded-full text-white"
        >
          Change username
        </div>
      </div>
    </Modal>
  );
}
