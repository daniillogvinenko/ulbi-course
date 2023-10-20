import { classNames } from "shared/lib/classNames/classNames";
import CopyIcon from "shared/assets/icons/copyItem.svg";
import { useCallback } from "react";
import Button, { ButtonTheme } from "../Button/Button";
import classes from "./Code.module.scss";

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
        <pre className={classNames(classes.Code, {}, [className])}>
            <Button
                onClick={onCopy}
                theme={ButtonTheme.CLEAR}
                className={classes.copyBtn}
            >
                <CopyIcon className={classes.copyIcon} />
            </Button>
            <code>{text}</code>
        </pre>
    );
};
