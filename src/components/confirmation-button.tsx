// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ButtonProps } from "antd/es/button";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

export interface ConfirmationButtonProps {
  title?: string;
  bodyText?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfirm?: (e: any) => void;
  confirmButton?: ButtonProps;
  yesButton?: ButtonProps;
  noButton?: ButtonProps;
}

export default function ConfirmationButton({
  title = "Confirm",
  bodyText = "Are you sure you want to delete this item?",
  confirmButton,
  yesButton,
  noButton,
  onConfirm,
}: ConfirmationButtonProps) {
  const [visible, setVisible] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleDialog = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (e.preventDefault) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      e.preventDefault();
    }
    setVisible(!visible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOk = (e: any) => {
    if (onConfirm) {
      onConfirm(e);
    }
    setVisible(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const handleCancel = (e: any) => {
    setVisible(false);
  };

  return (
    <>
      <Button
        icon={<DeleteOutlined />}
        danger
        {...confirmButton}
        onClick={toggleDialog}
      >
        {confirmButton?.children}
      </Button>
      <Modal
        okType="danger"
        okText="Delete"
        centered
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={yesButton}
        cancelButtonProps={noButton}
      >
        <p>{bodyText}</p>
      </Modal>
    </>
  );
}
