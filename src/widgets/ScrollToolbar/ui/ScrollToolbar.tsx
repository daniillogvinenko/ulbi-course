import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./ScrollToolbar.module.scss";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { ScrollTopButton } from "@/features/scrollTopButton";

interface ScrollToolbarProps {
    className?: string;
}

export const ScrollToolbar = (props: ScrollToolbarProps) => {
    const { className } = props;

    return (
        <VStack justify="center" align="center" max className={classNames(classes.ScrollToolbar, {}, [className])}>
            <ScrollTopButton />
        </VStack>
    );
};
