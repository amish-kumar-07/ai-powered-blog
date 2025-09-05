import { articles, Article } from "../data/articles";
import ArticleCard from "./ArticleCard";

interface RelatedArticlesProps {
  currentArticleId: string;
  category: string;
}

const RelatedArticles = ({ currentArticleId, category }: RelatedArticlesProps) => {
  // Find articles in the same category, excluding the current one
  const relatedArticles: Article[] = articles
    .filter(
      (article) => article.category === category && article.id !== currentArticleId
    )
    .slice(0, 3);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Related Articles</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;