interface IUser {
  _id: string;
  email: string;
  username: string;
  fullName: string;
  bio?: string;
  createdAt: string;
  articlesCount?: number;
  sharesRemaining?: number;
  articlesPosted?: number;
  profilePicture?: string;
}

interface IMembershipPlan {
  id: string;
  name: string;
  price: number;
  interval: "monthly" | "yearly";
  features: string[];
  isPopular?: boolean;
}

interface ITransaction {
  id: string;
  type: "membership" | "article_purchase";
  amount: number;
  description: string;
  createdAt: string;
  status: "completed" | "pending" | "failed";
}

interface INotification {
  id: string;
  type: "follow" | "article" | "hashtag";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}
