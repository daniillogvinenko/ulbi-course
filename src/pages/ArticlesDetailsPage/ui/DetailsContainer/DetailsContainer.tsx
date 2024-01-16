import { useParams } from "react-router-dom";
import { ArticleDetails } from "@/entities/Article";
import { Card } from "@/shared/ui/redesigned/Card";

interface DetailsContainerProps {
    className?: string;
}

export const DetailsContainer = ({ className }: DetailsContainerProps) => {
    const { id } = useParams<{ id: string }>();

    return (
        <Card max border="roundBorder" className={className} padding="24">
            <ArticleDetails id={id} />
        </Card>
    );
};
