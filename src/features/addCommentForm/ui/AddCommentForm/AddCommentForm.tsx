import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { DynamicModuleLoader, ReducerList } from "@/shared/lib/components/DynamicModuleLoader/ui/DynamicModuleLoader";
import { Button as ButtonDeprecated, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { getAddCommentFormText } from "../../model/selectors/addCommentFormSelectors";
import { addCommentFormActions, addCommentFormReducer } from "../../model/slices/addCommentFormSlice";
import classes from "./addCommentForm.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Input } from "@/shared/ui/redesigned/Input";
import { Button } from "@/shared/ui/redesigned/Button";
import { Card } from "@/shared/ui/redesigned/Card";

export interface addCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducerList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = (props: addCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation();

    const text = useSelector(getAddCommentFormText);
    const dispatch = useDispatch();

    const onCommentTextChange = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value));
        },
        [dispatch]
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || "");
        onCommentTextChange("");
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <HStack justify="between" className={classNames(classes.AddCommentForm, {}, [className])}>
                        <InputDeprecated
                            className={classes.input}
                            value={text}
                            onChange={onCommentTextChange}
                            placeholder={t("Введите комментарий")}
                        />
                        <ButtonDeprecated onClick={onSendHandler} theme={ButtonTheme.OUTLINE}>
                            {t("Отправить")}
                        </ButtonDeprecated>
                    </HStack>
                }
                on={
                    <Card max padding="24" border="roundBorder">
                        <HStack
                            justify="between"
                            gap="16"
                            max
                            className={classNames(classes.AddCommentFormRedesigned, {}, [className])}
                        >
                            <Input
                                className={classes.input}
                                value={text}
                                onChange={onCommentTextChange}
                                placeholder={t("Введите комментарий")}
                            />
                            <Button onClick={onSendHandler} variant="outline">
                                {t("Отправить")}
                            </Button>
                        </HStack>
                    </Card>
                }
            />
        </DynamicModuleLoader>
    );
};

// асинхронные lazy функции (в .async.tsx файлах) работают только с дефолтными импортами
export default AddCommentForm;
