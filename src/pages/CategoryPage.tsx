import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { articles, Article, categories } from "../data/articles";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import { Button } from "../components/ui/button";
import { ChevronLeft } from "lucide-react";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [categoryArticles, setCategoryArticles] = useState<Article[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<{ name: string; count: number } | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    if (category) {
      const filtered = articles.filter((article) => article.category === category);
      setCategoryArticles(filtered);

      const info = categories.find((c) => c.slug === category);
      if (info) {
        setCategoryInfo(info);
        document.title = `${info.name} Articles | AI-Powered Blog`;
      }
    }
  }, [category]);

  if (!category || !categoryInfo) {
    return (
      <div className="container mx-auto flex h-[50vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold">Category not found</h2>
          <p className="mb-4 text-muted-foreground">
            The category you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/" className="mb-2 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold">{categoryInfo.name}</h1>
        <p className="text-muted-foreground">
          Exploring the latest developments and insights in {categoryInfo.name.toLowerCase()}.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          {categoryArticles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {categoryArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-8 text-center">
              <h2 className="mb-2 text-xl font-medium">No articles found</h2>
              <p className="text-muted-foreground">
                There are currently no articles in this category.
              </p>
            </div>
          )}
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default CategoryPage;