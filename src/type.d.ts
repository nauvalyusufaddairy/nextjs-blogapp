type Account = {
  _id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
};
type Session = {
  _id: string;
  sessionToken: string;
  userId: string;
  expires: string;
};
type Post = {
  _id: string;
  createdAt: string;
  slug: string;
  title: string;
  desc: string;
  img?: string;
  views: number;
  catSlug: string;
  userEmail: string;
};

type Category = {
  _id: string;
  slug: string;
  title: string;
  img?: string;
};

type User = {
  _id: string;
  name?: string;
  email: string;
  emailVerified: string;
  image?: string;
  accounts?: Account;
  sessions?: Session;
  Post?: Post[];
  Comment?: Comment[];
};

type Comment = {
  _id: string;
  createdAt: string;
  desc: string;
  userEmail: string;

  postSlug: String;
};
