import { MutableRefObject, ReactNode, useRef, UIEvent } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useInfiniteScroll } from "@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUIScrollByPath, uiActions } from "@/features/UI";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { StateSchema } from "@/app/providers/StoreProvider";
import { useThrottle } from "@/shared/lib/hooks/useThrottle/useThrottle";
import classes from "./Page.module.scss";
import { TestProps } from "@/shared/types/tests";
import { toggleFeatures } from "@/shared/lib/features";

interface PageProps extends TestProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = (props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector(
        (state: StateSchema) => getUIScrollByPath(state, pathname)
        // eslint-disable-next-line function-paren-newline
    );

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        // при открытии страницы устанавливаем скролл из стейта
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(
            uiActions.setScrollPosition({
                path: pathname,
                position: e.currentTarget.scrollTop,
            })
        );
    }, 500);

    return (
        <main
            // eslint-disable-next-line react/destructuring-assignment
            data-testid={props["data-testid"] ?? "Page"}
            ref={wrapperRef}
            className={classNames(
                toggleFeatures({
                    name: "isAppRedesigned",
                    on: () => classes.PageRedesigned,
                    off: () => classes.Page,
                }),
                {},
                [className]
            )}
            onScroll={onScroll}
        >
            {children}
            {onScrollEnd && <div className={classes.trigger} ref={triggerRef} />}
        </main>
    );
};
