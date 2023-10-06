// eslint-disable-next-line object-curly-newline
import React, { useCallback, useEffect, useRef, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Portal } from "../Portal/Portal";
import classes from "./Modal.module.scss";

interface ModalProps {
    className?: string;
    children?: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 150;

export const Modal = (props: ModalProps) => {
    // eslint-disable-next-line object-curly-newline
    const { children, className, isOpen, onClose, lazy } = props;

    const [isClosing, setIsClosing] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const mods: Record<string, boolean> = {
        [classes.opened]: isOpen,
        [classes.isClosing]: isClosing,
    };

    // при самом первом открытии компонента isMounted устанавливается true
    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const closeHandler = useCallback(() => {
        setIsClosing(true);
        if (onClose) {
            // урок 29 15:46 - зачем этот реф
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    // тут важно писать обычный KeyboardEvent, а не Реакт
    // на каждый перерендер компонента, эти функции создаются заново, нам это не надо, поэтому используем useCallback
    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeHandler();
            }
        },
        [closeHandler]
    );

    const onContentClick = (e: React.MouseEvent) => {
        // предотвращаем закрытие модалки по клику на сам контент
        e.stopPropagation();
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    // если у нас ленивая подгрузка и компонент не вмонтирован, то мы будем возвращать null
    // при первом открытии компонента установится isMounted = true и компонент отрисуется как надо и уже останется в DOM дереве, даже после "закрытия" компонента
    if (lazy && !isMounted) {
        return null;
    }

    return (
        // Портал рендерит children в любом другом месте DOM (по умолчанию мы указали - body)
        <Portal>
            <div className={classNames(classes.Modal, mods, [className])}>
                <div className={classes.overlay} onClick={closeHandler}>
                    <div className={classes.content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
