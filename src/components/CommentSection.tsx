import { useState } from "react";
import { comments } from "../data/articles";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { MessageSquare, ThumbsUp, Reply } from "lucide-react";

interface CommentSectionProps {
  articleId: string;
}

const CommentSection = ({ articleId }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const articleComments = comments.filter((comment) => comment.articleId === articleId);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // In a real app, this would send the comment to an API
      alert("Comment submitted: " + newComment);
      setNewComment("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Comments ({articleComments.length})
        </h2>
      </div>

      <form onSubmit={handleSubmitComment} className="space-y-4">
        <Textarea
          placeholder="Share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px]"
        />
        <Button type="submit" disabled={!newComment.trim()}>
          Post Comment
        </Button>
      </form>

      <div className="space-y-6">
        {articleComments.length > 0 ? (
          articleComments.map((comment) => (
            <div key={comment.id} className="comment-thread">
              <div className="comment">
                <div className="comment-header">
                  <div className="flex items-center gap-3">
                    <img
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{comment.author.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(comment.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`sentiment-indicator ${
                      comment.sentiment === "positive"
                        ? "sentiment-positive"
                        : comment.sentiment === "negative"
                        ? "sentiment-negative"
                        : "sentiment-neutral"
                    }`}
                  />
                </div>
                <div className="comment-body">{comment.content}</div>
                <div className="mt-3 flex items-center gap-4">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <ThumbsUp className="h-3 w-3" />
                    Like
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <Reply className="h-3 w-3" />
                    Reply
                  </button>
                </div>

                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4 pl-6">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="comment">
                        <div className="comment-header">
                          <div className="flex items-center gap-3">
                            <img
                              src={reply.author.avatar}
                              alt={reply.author.name}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">
                                  {reply.author.name}
                                </p>
                                {reply.author.isAuthor && (
                                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                    Author
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {new Date(reply.publishedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`sentiment-indicator ${
                              reply.sentiment === "positive"
                                ? "sentiment-positive"
                                : reply.sentiment === "negative"
                                ? "sentiment-negative"
                                : "sentiment-neutral"
                            }`}
                          />
                        </div>
                        <div className="comment-body">{reply.content}</div>
                        <div className="mt-3 flex items-center gap-4">
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                            <ThumbsUp className="h-3 w-3" />
                            Like
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-8 text-center">
            <MessageSquare className="mb-2 h-10 w-10 text-muted-foreground" />
            <h3 className="mb-1 text-lg font-medium">No comments yet</h3>
            <p className="text-sm text-muted-foreground">
              Be the first to share your thoughts on this article.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;