import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Icon.module.scss";

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, "onClick">;

interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
    clickable: true;
    onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableIconProps;

export const Icon = (props: IconProps) => {
    const { clickable, className, Svg, height = 32, width = 32, ...otherProps } = props;

    const icon = (
        <Svg
            height={height}
            width={width}
            className={classNames(classes.Icon, {}, [className])}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            // eslint-disable-next-line react/destructuring-assignment
            <button className={classes.button} onClick={props.onClick} type="button" style={{ height, width }}>
                {icon}
            </button>
        );
    }

    return icon;
};
