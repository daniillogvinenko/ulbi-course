import cls from "./AppLogo.module.scss";
import { HStack } from "../../deprecated/Stack";
import AppSvg from "@/shared/assets/icons/app-image.svg";
import { classNames } from "@/shared/lib/classNames/classNames";

interface AppLogoProps {
    className?: string;
    size?: number;
}

export const AppLogo = ({ className, size }: AppLogoProps) => (
    <HStack max justify="center" className={classNames(cls.appLogoWrapper, {}, [className])}>
        <AppSvg color="black" width={size} height={size} className={cls.appLogo} />
        <div className={cls.gradientBig} />
        <div className={cls.gradientSmall} />
    </HStack>
);
