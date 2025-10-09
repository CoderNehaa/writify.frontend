interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  avatar?: string;
  bio?: string;
  isPremium: boolean;
  createdAt: string;
  followersCount: number;
  followingCount: number;
  articlesCount: number;
  sharesRemaining: number;
  articlesPosted: number;
}

interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
}

interface Transaction {
  id: string;
  type: 'membership' | 'article_purchase';
  amount: number;
  description: string;
  createdAt: string;
  status: 'completed' | 'pending' | 'failed';
}

interface Notification {
  id: string;
  type: 'follow' | 'article' | 'hashtag';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}
