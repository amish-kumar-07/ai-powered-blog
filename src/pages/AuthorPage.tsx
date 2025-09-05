import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { authors, articles, Article } from "../data/articles";
import ArticleCard from "../components/ArticleCard";
import { Button } from "../components/ui/button";
import { ChevronLeft, UserPlus, Twitter, Linkedin, Globe } from "lucide-react";

const AuthorPage = () => {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<typeof authors[0] | null>(null);
  const [authorArticles, setAuthorArticles] = useState<Article[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    if (id) {
      const foundAuthor = authors.find((a) => a.id === id);
      if (foundAuthor) {
        setAuthor(foundAuthor);
        document.title = `${foundAuthor.name} | AI-Powered Blog`;

        const filtered = articles.filter((article) => article.author.id === id);
        setAuthorArticles(filtered);
      }
    }
  }, [id]);

  if (!author) {
    return (
      <div className="container mx-auto flex h-[50vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold">Author not found</h2>
          <p className="mb-4 text-muted-foreground">
            The author you're looking for doesn't exist or has been removed.
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
      <Link to="/" className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ChevronLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="mb-8 rounded-lg border border-border bg-card p-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          <img
            src={author.avatar}
            alt={author.name}
            className="h-32 w-32 rounded-full object-cover"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="mb-2 text-3xl font-bold">{author.name}</h1>
            <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {author.expertise} ({author.expertiseScore}%)
            </div>
            <p className="mb-4 text-muted-foreground">{author.bio}</p>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <div className="text-center">
                <p className="text-xl font-bold">{author.articles}</p>
                <p className="text-xs text-muted-foreground">Articles</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{author.followers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Follow
            </Button>
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Website</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold">Articles by {author.name}</h2>
      </div>

      {authorArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {authorArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <h2 className="mb-2 text-xl font-medium">No articles found</h2>
          <p className="text-muted-foreground">
            This author hasn't published any articles yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthorPage;