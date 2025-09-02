"use client";

import CustomModal from "@/components/UI/common/modal";
import RegistrationForm from "@/forms/registration.form";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegistrationModal = ({isOpen, onClose}: IProps) => {
    return(
        <CustomModal isOpen={isOpen} onClose={onClose} title="Create account">
            <RegistrationForm onClose={onClose} />
        </CustomModal>
    );
}

export default RegistrationModal;