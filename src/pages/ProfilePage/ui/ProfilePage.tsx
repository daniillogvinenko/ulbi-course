import { profileReducer } from "entities/Profile";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import classes from "./ProfilePage.module.scss";

const reducers: ReducerList = {
    profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    return (
        <DynamicModuleLoader reducers={reducers} removeReducersAfterUnmount>
            <div className={classNames(classes.ProfilePage, {}, [className])}>
                {t("ProfilePage")}
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
