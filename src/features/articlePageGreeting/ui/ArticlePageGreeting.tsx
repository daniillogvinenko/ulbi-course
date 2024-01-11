import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
import { Modal } from "@/shared/ui/deprecated/Modal";
import { Text } from "@/shared/ui/deprecated/Text";
import { saveJsonSettings, useJsonSettings } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Drawer } from "@/shared/ui/deprecated/Drawer";

export const ArticlePageGreeting = () => {
    const { t } = useTranslation();
    const [isOpened, setIsOpened] = useState(false);
    const { isArticlesPageWasVisited } = useJsonSettings();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isArticlesPageWasVisited) {
            setIsOpened(true);
            dispatch(saveJsonSettings({ isArticlesPageWasVisited: true }));
        }
    }, [isArticlesPageWasVisited, dispatch]);

    const onClose = () => {
        setIsOpened(false);
    };

    const text = (
        <Text
            title={t("Добро пожаловать на страницу статей")}
            text={t("Здесь Вы можете искать и просматривать статьи на различные темы")}
        />
    );

    if (isMobile) {
        return (
            <Drawer lazy isOpen={isOpened} onClose={onClose}>
                {text}
            </Drawer>
        );
    }

    return (
        <Modal lazy isOpen={isOpened} onClose={onClose}>
            {text}
        </Modal>
    );
};
