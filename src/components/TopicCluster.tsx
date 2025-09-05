import { topicClusters } from "../data/articles";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const TopicCluster = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Trending Topics</h2>
        <Sparkles className="h-5 w-5 text-primary" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {topicClusters.map((cluster) => (
          <div
            key={cluster.id}
            className="rounded-lg border border-border bg-muted/30 p-4 transition-all hover:border-primary/50 hover:shadow-md"
          >
            <h3 className="mb-2 text-base font-semibold">{cluster.name}</h3>
            <div className="flex flex-wrap gap-2">
              {cluster.topics.map((topic, index) => (
                <Link
                  key={index}
                  to={`/search?q=${encodeURIComponent(topic)}`}
                  className="topic-tag"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicCluster;