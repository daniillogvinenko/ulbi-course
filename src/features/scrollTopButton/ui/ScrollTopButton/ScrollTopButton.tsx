import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./ScrollTopButton.module.scss";
import { Icon } from "@/shared/ui/redesigned/Icon";
import ScrollTopIcon from "@/shared/assets/icons/circle-up.svg";

interface ScrollTopButtonProps {
    className?: string;
}

export const ScrollTopButton = (props: ScrollTopButtonProps) => {
    const { className } = props;

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Icon
            clickable
            onClick={handleClick}
            Svg={ScrollTopIcon}
            width={32}
            height={32}
            className={classNames(classes.ScrollTopButton, {}, [className])}
        />
    );
};
