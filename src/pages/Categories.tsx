import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "1",
    name: "Technology",
    slug: "technology",
    description: "Latest trends in tech, programming, and innovation",
    articleCount: 1250,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "2",
    name: "Business",
    slug: "business",
    description: "Entrepreneurship, startups, and business insights",
    articleCount: 850,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "3",
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Health, wellness, and personal development",
    articleCount: 620,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "4",
    name: "Education",
    slug: "education",
    description: "Learning resources, tutorials, and academic insights",
    articleCount: 540,
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "5",
    name: "Health",
    slug: "health",
    description: "Medical insights, fitness, and nutrition",
    articleCount: 480,
    color: "from-red-500 to-orange-500",
  },
  {
    id: "6",
    name: "Travel",
    slug: "travel",
    description: "Destinations, travel tips, and adventures",
    articleCount: 390,
    color: "from-teal-500 to-cyan-500",
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Categories</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover articles organized by topics that interest you most
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/articles?category=${category.slug}`}
                className="group"
              >
                <Card className="h-full hover-lift shadow-card border-0 bg-gradient-card overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${category.color}`} />
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {category.name}
                      </CardTitle>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <CardDescription className="text-base">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">
                      {category.articleCount.toLocaleString()} articles
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
