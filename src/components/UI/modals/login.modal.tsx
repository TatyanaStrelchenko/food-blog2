"use client";

import CustomModal from "@/components/UI/common/modal";
import LoginForm from "@/forms/login.form";
import RegistrationForm from "@/forms/registration.form";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: IProps) {
    return(
        <CustomModal isOpen={isOpen} onClose={onClose} title="Login">
            <LoginForm onClose={onClose} />
        </CustomModal>
    );
}
