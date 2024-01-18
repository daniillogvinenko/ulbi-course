import { useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { Card as CardDeprecated } from "@/shared/ui/deprecated/Card";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import { StarRating } from "@/shared/ui/deprecated/StarRating";
import { Modal } from "@/shared/ui/redesigned/Modal";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input";
import { ButtonTheme, Button as ButtonDeprecated } from "@/shared/ui/deprecated/Button";
import { Drawer } from "@/shared/ui/redesigned/Drawer";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text";
import { Input } from "@/shared/ui/redesigned/Input";
import { Button } from "@/shared/ui/redesigned/Button";
import { Card } from "@/shared/ui/redesigned/Card";

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback: string) => void;
    rate?: number;
}

export const RatingCard = (props: RatingCardProps) => {
    const { className, feedbackTitle, hasFeedback, onAccept, onCancel, title, rate = 0 } = props;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [starsCount, setStarsCount] = useState<number>(rate);
    const [feedback, setFeedback] = useState<string>("");

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount, feedback);
            }
        },
        [hasFeedback, onAccept, feedback]
    );

    const acceptHandler = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandler = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <>
                    <TextDeprecated title={feedbackTitle} />
                    <InputDeprecated value={feedback} onChange={setFeedback} placeholder={t("Ваш отзыв")} />
                </>
            }
            on={
                <>
                    <Text title={feedbackTitle} />
                    <Input value={feedback} onChange={setFeedback} placeholder={t("Ваш отзыв")} />
                </>
            }
        />
    );

    const content = (
        <>
            <VStack align="center" gap="8">
                <ToggleFeatures
                    feature="isAppRedesigned"
                    off={<TextDeprecated title={starsCount ? t("Спасибо за оценку!") : title} />}
                    on={<Text title={starsCount ? t("Спасибо за оценку!") : title} />}
                />
                <StarRating size={30} onSelect={onSelectStars} selectedStars={starsCount} />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack max gap="32">
                        {modalContent}
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            off={
                                <HStack max gap="16" justify="end">
                                    <ButtonDeprecated onClick={cancelHandler} theme={ButtonTheme.OUTLINE_RED}>
                                        {t("Закрыть")}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated onClick={acceptHandler} theme={ButtonTheme.OUTLINE}>
                                        {t("Отправить")}
                                    </ButtonDeprecated>
                                </HStack>
                            }
                            on={
                                <HStack max gap="16" justify="end">
                                    <Button onClick={cancelHandler} variant="outline">
                                        {t("Закрыть")}
                                    </Button>
                                    <Button onClick={acceptHandler} variant="outline">
                                        {t("Отправить")}
                                    </Button>
                                </HStack>
                            }
                        />
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer onClose={cancelHandler} lazy isOpen={isModalOpen}>
                    <VStack gap="32">
                        {modalContent}
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            off={
                                <ButtonDeprecated fullWidth onClick={acceptHandler} theme={ButtonTheme.OUTLINE}>
                                    {t("Отправить")}
                                </ButtonDeprecated>
                            }
                            on={
                                <Button fullWidth onClick={acceptHandler} variant="outline">
                                    {t("Отправить")}
                                </Button>
                            }
                        />
                    </VStack>
                </Drawer>
            </MobileView>
        </>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <CardDeprecated className={className} max>
                    {content}
                </CardDeprecated>
            }
            on={
                <Card padding="24" border="roundBorder" className={className} max>
                    {content}
                </Card>
            }
        />
    );
};
