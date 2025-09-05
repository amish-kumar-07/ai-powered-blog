import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ChevronDown 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header
      className={`floating-header sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? "border-b border-border bg-background/80 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <span className="text-xl font-bold text-primary-foreground">AI</span>
            </div>
            <span className="hidden text-xl font-bold md:inline-block">
              AI-Powered Blog
            </span>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li>
                <Link
                  to="/"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === "/" ? "text-primary" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                    Categories <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link to="/category/technology" className="w-full">
                        Technology
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/category/ai" className="w-full">
                        Artificial Intelligence
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/category/data-science" className="w-full">
                        Data Science
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/category/machine-learning" className="w-full">
                        Machine Learning
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <Link
                  to="/author/featured"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname.startsWith("/author") ? "text-primary" : ""
                  }`}
                >
                  Authors
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <form
            onSubmit={handleSearch}
            className="hidden items-center md:flex"
          >
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="w-[200px] pl-8 lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 py-4">
                <div className="flex items-center justify-between">
                  <Link to="/" className="flex items-center gap-2">
                    <div className="rounded-md bg-primary p-1">
                      <span className="text-xl font-bold text-primary-foreground">
                        AI
                      </span>
                    </div>
                    <span className="text-xl font-bold">AI-Powered Blog</span>
                  </Link>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                </div>

                <form onSubmit={handleSearch} className="flex items-center">
                  <div className="relative w-full">
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

                <nav className="flex flex-col space-y-4">
                  <Link
                    to="/"
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    Home
                  </Link>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Categories
                    </h3>
                    <div className="flex flex-col space-y-2 pl-2">
                      <Link
                        to="/category/technology"
                        className="text-sm transition-colors hover:text-primary"
                      >
                        Technology
                      </Link>
                      <Link
                        to="/category/ai"
                        className="text-sm transition-colors hover:text-primary"
                      >
                        Artificial Intelligence
                      </Link>
                      <Link
                        to="/category/data-science"
                        className="text-sm transition-colors hover:text-primary"
                      >
                        Data Science
                      </Link>
                      <Link
                        to="/category/machine-learning"
                        className="text-sm transition-colors hover:text-primary"
                      >
                        Machine Learning
                      </Link>
                    </div>
                  </div>
                  <Link
                    to="/author/featured"
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    Authors
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;