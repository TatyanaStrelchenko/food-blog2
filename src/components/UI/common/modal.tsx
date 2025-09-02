"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";
import type { ReactNode } from "react";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export default function CustomModal({isOpen, onClose, size="xs", title, children}: IProps) {

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
                <h3>{title}</h3>
            </ModalHeader>
            <ModalBody>
               {children}
            </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

