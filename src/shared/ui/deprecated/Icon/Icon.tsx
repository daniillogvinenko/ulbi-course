import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Icon.module.scss";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

/**
 * @deprecated
 */
export const Icon = (props: IconProps) => {
    const { className, Svg, inverted, ...otherProps } = props;

    return <Svg className={classNames(inverted ? classes.inverted : classes.Icon, {}, [className])} {...otherProps} />;
};
