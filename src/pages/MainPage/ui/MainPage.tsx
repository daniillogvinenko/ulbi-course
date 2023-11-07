import React from "react";
import { useTranslation } from "react-i18next";
import { ListBox } from "shared/ui/ListBox/ListBox";
import { HStack } from "shared/ui/Stack";
import { Page } from "widgets/Page/Page";

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <Page>
            <div>121djfdjfdf</div>
            <div>121djfdjfdf</div>
            <HStack>
                <div>121djfdjfdf</div>
                <ListBox
                    onChange={(value: string) => {}}
                    value={undefined}
                    defaultValue="Выберите значение"
                    items={[
                        { value: "1", content: "123", disabled: false },
                        { value: "2", content: "ahhadha", disabled: true },
                        { value: "3", content: "32sds", disabled: false },
                        { value: "4", content: "32sds", disabled: false },
                    ]}
                />
            </HStack>
            <div>121djfdjfdf</div>
            <div>121djfdjfdf</div>
            {t("Главная")}
        </Page>
    );
};

export default MainPage;
