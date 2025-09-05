import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { articles, Article } from "../data/articles";
import Sidebar from "../components/Sidebar";
import CommentSection from "../components/CommentSection";
import RelatedArticles from "../components/RelatedArticles";
import ReadingProgress from "../components/ReadingProgress";
import { Button } from "../components/ui/button";
import { Clock, Calendar1 as Calendar, Bookmark, Share2, ThumbsUp, MessageSquare } from






"lucide-react";

const ArticlePage = () => {
  const { id } = useParams<{id: string;}>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundArticle = articles.find((a) => a.id === id);
    if (foundArticle) {
      setArticle(foundArticle);
      // Set page title
      document.title = `${foundArticle.title} | AI-Powered Blog`;
    }
  }, [id]);

  if (!article) {
    return (
      <div className="container mx-auto flex h-[50vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold">Article not found</h2>
          <p className="mb-4 text-muted-foreground">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>);

  }

  return (
    <>
      <ReadingProgress />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link
              to={`/category/${article.category}`}
              className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">

              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </Link>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readingTime} min read
            </span>
          </div>
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mb-6 text-lg text-muted-foreground">{article.excerpt}</p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="h-12 w-12 rounded-full object-cover" />

              <div>
                <Link
                  to={`/author/${article.author.id}`}
                  className="text-base font-medium hover:text-primary">

                  {article.author.name}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {article.author.expertise} ({article.author.expertiseScore}%)
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <article className="flex-1">
            <div className="mb-8 overflow-hidden rounded-lg">
              <img
                src={article.image}
                alt={article.title}
                className="h-auto w-full object-cover" />

            </div>

            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: article.content }} />


            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) =>
                <Link
                  key={index}
                  to={`/search?q=${encodeURIComponent(tag)}`}
                  className="topic-tag">

                    {tag}
                  </Link>
                )}
              </div>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  Like
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1"
                  onClick={() => {
                    const commentSection = document.getElementById("comments");
                    commentSection?.scrollIntoView({ behavior: "smooth" });
                  }}>

                  <MessageSquare className="h-4 w-4" />
                  Comment
                </Button>
              </div>
            </div>

            <div className="mt-12" id="comments">
              <CommentSection articleId={article.id} />
            </div>

            <div className="mt-12">
              <RelatedArticles
                currentArticleId={article.id}
                category={article.category} />

            </div>
          </article>

          <Sidebar />
        </div>
      </div>
    </>);

};

export default ArticlePage;