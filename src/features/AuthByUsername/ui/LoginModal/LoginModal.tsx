import { classNames } from "shared/lib/classNames/classNames";
import { Modal } from "shared/ui/Modal/Modal";
import { LoginForm } from "../LoginForm/LoginForm";
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
            <LoginForm />
        </Modal>
    );
};
