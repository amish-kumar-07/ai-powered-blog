import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { articles, Article } from "../data/articles";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import { Button } from "../components/ui/button";
import { ChevronLeft, Search, Mic } from "lucide-react";
import { Input } from "../components/ui/input";

const SearchPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Article[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearchQuery(query);

    if (query) {
      // In a real app, this would be an API call
      const results = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          article.content.toLowerCase().includes(query.toLowerCase()) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(results);
      document.title = `Search: ${query} | AI-Powered Blog`;
    } else {
      setSearchResults([]);
      document.title = "Search | AI-Powered Blog";
    }
  }, [location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ChevronLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="mb-8">
        <h1 className="mb-6 text-3xl font-bold">Search Articles</h1>
        <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for articles, topics, or keywords..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" className="gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
          <Button type="button" variant="outline" className="gap-2">
            <Mic className="h-4 w-4" />
            Voice Search
          </Button>
        </form>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          {searchQuery ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-medium">
                  {searchResults.length > 0
                    ? `Found ${searchResults.length} results for "${searchQuery}"`
                    : `No results found for "${searchQuery}"`}
                </h2>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {searchResults.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border p-8 text-center">
                  <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h2 className="mb-2 text-xl font-medium">No results found</h2>
                  <p className="mb-4 text-muted-foreground">
                    We couldn't find any articles matching your search.
                  </p>
                  <div className="space-y-2 text-left">
                    <p className="text-sm font-medium">Try:</p>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      <li>Checking your spelling</li>
                      <li>Using fewer or different keywords</li>
                      <li>Browsing our categories instead</li>
                    </ul>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-8 text-center">
              <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-medium">Search for articles</h2>
              <p className="text-muted-foreground">
                Enter a search term to find articles, topics, or keywords.
              </p>
            </div>
          )}
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default SearchPage;