import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { Profile } from "../../model/types/profile";
import { ToggleFeatures } from "@/shared/lib/features";
import {
    ProfileCardDeprecated,
    ProfileCardDeprecatedError,
    ProfileCardDeprecatedLoader,
} from "../ProfileCardDeprecated/ProfileCardDeprecated";
import {
    ProfileCardRedesigned,
    ProfileCardRedesignedError,
    ProfileCardRedesignedSkeleton,
} from "../ProfileCardRedesigned/ProfileCardRedesigned";

export interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeFirstname?: (value?: string) => void;
    onChangeLastname?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (currency?: Currency) => void;
    onChangeCountry?: (country?: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { error, isLoading } = props;

    if (isLoading) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                off={<ProfileCardDeprecatedLoader />}
                on={<ProfileCardRedesignedSkeleton />}
            />
        );
    }

    if (error) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                off={<ProfileCardDeprecatedError />}
                on={<ProfileCardRedesignedError />}
            />
        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={<ProfileCardDeprecated {...props} />}
            on={<ProfileCardRedesigned {...props} />}
        />
    );
};
