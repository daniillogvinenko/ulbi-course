import { useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import CopyIconNew from "@/shared/assets/icons/copy.svg";
import CopyIcon from "@/shared/assets/icons/copyItem.svg";
import { Button, ButtonTheme } from "../../deprecated/Button/Button";
import classes from "./Code.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Icon } from "../Icon";

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = (props: CodeProps) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <pre className={classNames(classes.CodeRedesigned, {}, [className])}>
                    <Icon clickable onClick={onCopy} className={classes.copyBtn} Svg={CopyIconNew} />
                    <code>{text}</code>
                </pre>
            }
            off={
                <pre className={classNames(classes.Code, {}, [className])}>
                    <Button onClick={onCopy} className={classes.copyBtn} theme={ButtonTheme.CLEAR}>
                        <CopyIcon className={classes.copyIcon} />
                    </Button>
                    <code>{text}</code>
                </pre>
            }
        />
    );
};
