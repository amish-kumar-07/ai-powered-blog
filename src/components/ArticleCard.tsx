import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { Article } from "../data/articles";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact";
}

const ArticleCard = ({ article, variant = "default" }: ArticleCardProps) => {
  if (variant === "featured") {
    return (
      <div className="article-card group overflow-hidden">
        <div className="relative aspect-[16/9]">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
              </span>
              <div className="flex items-center gap-1 text-xs text-white">
                <Clock className="h-3 w-3" />
                <span>{article.readingTime} min read</span>
              </div>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-white">
              <Link to={`/article/${article.id}`}>{article.title}</Link>
            </h3>
            <p className="mb-4 text-sm text-gray-200 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-white">
                  {article.author.name}
                </p>
                <p className="text-xs text-gray-300">
                  {article.author.expertise} ({article.author.expertiseScore}%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex gap-4">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="mb-1 font-medium line-clamp-2">
            <Link to={`/article/${article.id}`}>{article.title}</Link>
          </h3>
          <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
            <span>{article.author.name}</span>
            <span>•</span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="article-card h-full">
      <div className="relative">
        <img
          src={article.image}
          alt={article.title}
          className="article-image"
        />
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
          </span>
        </div>
      </div>
      <div className="article-content">
        <h3 className="article-title">
          <Link to={`/article/${article.id}`}>{article.title}</Link>
        </h3>
        <div className="article-meta">
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{article.readingTime} min read</span>
        </div>
        <p className="article-excerpt">{article.excerpt}</p>
        <div className="mt-4 flex items-center gap-3">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium">{article.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {article.author.expertise} ({article.author.expertiseScore}%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;