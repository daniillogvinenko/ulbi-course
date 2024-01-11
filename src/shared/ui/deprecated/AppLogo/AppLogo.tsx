import cls from "./AppLogo.module.scss";
import { HStack } from "../Stack";
import AppSvg from "@/shared/assets/icons/app-image.svg";
import { classNames } from "@/shared/lib/classNames/classNames";

interface AppLogoProps {
    className?: string;
}

/**
 * @deprecated
 */
export const AppLogo = ({ className }: AppLogoProps) => (
    <HStack max justify="center" className={classNames(cls.appLogoWrapper, {}, [className])}>
        <AppSvg width={50} height={50} className={cls.appLogo} />
        <div className={cls.gradientBig} />
        <div className={cls.gradientSmall} />
    </HStack>
);
