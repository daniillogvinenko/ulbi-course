import { CSSProperties, useMemo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Avatar.module.scss";
import { AppImage } from "../AppImage";
import UserIcon from "../../../assets/icons/user-filled.svg";
import { Icon } from "../Icon";
import { Skeleton } from "../Skeleton";

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    fallbackInverted?: boolean;
}

/**
 * @deprecated
 */
export const Avatar = (props: AvatarProps) => {
    const { className, src, size = 100, alt, fallbackInverted } = props;

    const styles = useMemo<CSSProperties>(
        () => ({
            width: size,
            height: size,
        }),
        [size]
    );

    const fallback = <Skeleton width={size} height={size} border="50%" />;
    const errorFallback = <Icon inverted={fallbackInverted} width={size} height={size} Svg={UserIcon} />;

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            alt={alt}
            src={src}
            style={styles}
            className={classNames(classes.Avatar, {}, [className])}
        />
    );
};
