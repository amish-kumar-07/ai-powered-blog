import { useState } from "react";
import { Link } from "react-router-dom";
import { Mic, Search, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { categories, recentArticles } from "../data/articles";

interface SidebarProps {
  showMobileSidebar?: boolean;
}

const Sidebar = ({ showMobileSidebar = false }: SidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <aside
      className={`sidebar ${
        showMobileSidebar ? "block" : "hidden md:block"
      }`}
    >
      <div className="sidebar-section">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="sidebar-section">
        <h4 className="sidebar-heading">Voice Search</h4>
        <Button variant="outline" className="voice-search w-full">
          <Mic className="mr-2 h-4 w-4" />
          <span>Search with voice</span>
        </Button>
      </div>

      <div className="sidebar-section">
        <h4 className="sidebar-heading">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.slug} className="flex items-center justify-between">
              <Link
                to={`/category/${category.slug}`}
                className="text-sm hover:text-primary"
              >
                {category.name}
              </Link>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                {category.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="flex items-center justify-between">
          <h4 className="sidebar-heading">Recent Articles</h4>
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div className="mt-4 space-y-4">
          {recentArticles.slice(0, 3).map((article) => (
            <div key={article.id} className="flex gap-3">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h5 className="text-sm font-medium line-clamp-2">
                  <Link to={`/article/${article.id}`}>{article.title}</Link>
                </h5>
                <p className="mt-1 text-xs text-muted-foreground">
                  {article.readingTime} min read
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h4 className="sidebar-heading">Popular Topics</h4>
        <div className="flex flex-wrap gap-2">
          <span className="topic-tag">Machine Learning</span>
          <span className="topic-tag">Data Science</span>
          <span className="topic-tag">Neural Networks</span>
          <span className="topic-tag">Computer Vision</span>
          <span className="topic-tag">Natural Language Processing</span>
          <span className="topic-tag">Reinforcement Learning</span>
          <span className="topic-tag">AI Ethics</span>
          <span className="topic-tag">Quantum Computing</span>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="rounded-lg bg-muted p-4">
          <h4 className="mb-2 text-sm font-medium">Subscribe to Newsletter</h4>
          <p className="mb-4 text-xs text-muted-foreground">
            Get the latest articles and insights delivered to your inbox weekly.
          </p>
          <form className="space-y-2">
            <Input
              type="email"
              placeholder="Your email address"
              className="w-full"
            />
            <Button type="submit" className="w-full">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;