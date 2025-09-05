import { Link } from "react-router-dom";
import { authors } from "../data/articles";
import { Button } from "./ui/button";
import { UserPlus } from "lucide-react";

interface AuthorCardProps {
  authorId: string;
  variant?: "compact" | "full";
}

const AuthorCard = ({ authorId, variant = "compact" }: AuthorCardProps) => {
  const author = authors.find((a) => a.id === authorId);

  if (!author) {
    return null;
  }

  if (variant === "compact") {
    return (
      <div className="author-profile">
        <img
          src={author.avatar}
          alt={author.name}
          className="author-avatar"
        />
        <div className="author-info">
          <Link to={`/author/${author.id}`} className="author-name hover:text-primary">
            {author.name}
          </Link>
          <span className="author-expertise">
            {author.expertise} ({author.expertiseScore}%)
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center">
      <img
        src={author.avatar}
        alt={author.name}
        className="mb-4 h-24 w-24 rounded-full object-cover"
      />
      <h3 className="mb-1 text-xl font-bold">
        <Link to={`/author/${author.id}`} className="hover:text-primary">
          {author.name}
        </Link>
      </h3>
      <div className="mb-2 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
        {author.expertise} ({author.expertiseScore}%)
      </div>
      <p className="mb-4 text-sm text-muted-foreground">{author.bio}</p>
      <div className="mb-4 flex w-full justify-center gap-6 text-center">
        <div>
          <p className="text-lg font-bold">{author.articles}</p>
          <p className="text-xs text-muted-foreground">Articles</p>
        </div>
        <div>
          <p className="text-lg font-bold">{author.followers.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Followers</p>
        </div>
      </div>
      <Button className="w-full gap-2">
        <UserPlus className="h-4 w-4" />
        Follow
      </Button>
    </div>
  );
};

export default AuthorCard;