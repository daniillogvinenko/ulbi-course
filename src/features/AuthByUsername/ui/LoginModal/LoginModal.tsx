import { Suspense } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Loader } from "shared/ui/Loader/Loader";
import { Modal } from "shared/ui/Modal/Modal";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";
import classes from "./LoginModal.module.scss";

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onCLose: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
    const { isOpen, onCLose, className } = props;

    return (
        <Modal
            lazy
            isOpen={isOpen}
            onClose={onCLose}
            className={classNames(classes.LoginModal, {}, [className])}
        >
            <Suspense fallback={<Loader />}>
                <LoginFormAsync />
            </Suspense>
        </Modal>
    );
};
