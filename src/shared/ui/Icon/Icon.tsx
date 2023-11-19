import { classNames } from "shared/lib/classNames/classNames";
import classes from "./Icon.module.scss";

interface IconProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

export const Icon = (props: IconProps) => {
    const { className, Svg, inverted } = props;

    return (
        <Svg
            className={classNames(
                inverted ? classes.inverted : classes.Icon,
                {},
                [className]
            )}
        />
    );
};
