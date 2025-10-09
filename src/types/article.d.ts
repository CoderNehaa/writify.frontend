interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: Author;
  category: Category;
  tags: string[];
  isPaid: boolean;
  coinPrice?: number;
  likes: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
  coverImage?: string;
  readTime: number;
  isBookmarked?: boolean;
}

interface Author {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  articlesCount: number;
  isFollowing?: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  articleCount: number;
}

interface Comment {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
  likes: number;
}

interface ArticleFilters {
  search?: string;
  category?: string;
  tags?: string[];
  isPaid?: boolean;
}
