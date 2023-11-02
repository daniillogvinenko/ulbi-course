import { ArticlesDetailsCommentsSchema } from "./ArticlesDetailsCommentsSchema";
import { articleDetailsRecommendationsSchema } from "./ArticleDetailsRecommendationsSchema";

export interface ArticleDetailsPageSchema {
    comments: ArticlesDetailsCommentsSchema;
    recommendations: articleDetailsRecommendationsSchema;
}
