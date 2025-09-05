import { Link } from "react-router-dom";
import { 
  trendingArticles, 
  featuredArticles, 
  recentArticles, 
  authors 
} from "../data/articles";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import TopicCluster from "../components/TopicCluster";
import AuthorCard from "../components/AuthorCard";
import { Button } from "../components/ui/button";
import { ChevronRight } from "lucide-react";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <TopicCluster />

      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Articles</h2>
          <Link to="/category/featured">
            <Button variant="ghost" className="gap-1 text-primary">
              View all <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="featured" />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <Link to="/category/trending">
            <Button variant="ghost" className="gap-1 text-primary">
              View all <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trendingArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Latest Articles</h2>
            <Link to="/category/latest">
              <Button variant="ghost" className="gap-1 text-primary">
                View all <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {recentArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
        <Sidebar />
      </div>

      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Authors</h2>
          <Link to="/author/featured">
            <Button variant="ghost" className="gap-1 text-primary">
              View all <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {authors.slice(0, 3).map((author) => (
            <AuthorCard key={author.id} authorId={author.id} variant="full" />
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-lg bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Stay Updated with AI Advancements</h2>
        <p className="mb-6 text-muted-foreground">
          Subscribe to our newsletter and never miss the latest developments in AI technology.
        </p>
        <div className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 rounded-md border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button className="whitespace-nowrap">Subscribe Now</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;