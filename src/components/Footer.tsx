import { Link } from "react-router-dom";
import { Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-md bg-primary p-1">
                <span className="text-xl font-bold text-primary-foreground">AI</span>
              </div>
              <span className="text-xl font-bold">AI-Powered Blog</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Exploring the frontiers of artificial intelligence and its impact on our world.
              Stay informed with cutting-edge research and applications.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/technology" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/category/ai" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link to="/category/data-science" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Data Science
                </Link>
              </li>
              <li>
                <Link to="/category/machine-learning" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Machine Learning
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/author/featured" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Authors
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Search
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
            <div className="mt-4">
              <h4 className="mb-2 text-sm font-medium">Subscribe to our newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-l-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="rounded-r-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AI-Powered Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;