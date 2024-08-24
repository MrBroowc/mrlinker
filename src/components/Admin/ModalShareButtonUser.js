import { ShareAltOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { PARAMS } from "broowc/constants/constants";
import { useAppContext } from "broowc/context/AppContext";
import { copyToClipboard } from "broowc/utils/helpers";

export default function ModalShareButtonUser(props) {
  const router = useRouter();
  const { dispatch } = useAppContext();
  const handleOnCancel = () => {
    dispatch({ type: PARAMS.SET_MODAL_SHARE_BUTTON_USER, value: false });
  };
  return (
    <Modal
      title={
        <p className="text-center m-0 text-lg">
          {props.user.data().profile_title}
        </p>
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
        <div className="flex justify-between items-center pb-5 border-b w-full">
          <span className="flex items-center gap-2 text-lg font-semibold">
            <ShareAltOutlined /> Share this Bio
          </span>
          <div className="text-center">
            <span
              onClick={() => {
                copyToClipboard(
                  `${process.env.NEXT_PUBLIC_SITE_URL}/u/${
                    props.user.data().username
                  }`
                );
              }}
              className="cursor-pointer bg-gray-600 text-white border rounded-md px-3 py-2 text-base font-semibold"
            >
              Copy Link
            </span>
          </div>
        </div>
        <div className="mt-7">
          <h3 className="text-lg mb-0">Create your own link</h3>
          <p className="m-0 font-semibold text-gray-400 text-sm">
            Hurry up and try it!
          </p>
        </div>
        <div
          onClick={() => {
            router.push("/login");
          }}
          className="cursor-pointer text-center font-bold mt-5 bg-gray-700 py-3 rounded-full text-white"
        >
          Sign up for free!
        </div>
      </div>
    </Modal>
  );
}
