// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

type Account = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at: ?number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
};

type Session = {
  id: string;
  sessionToken: string;
  userId: string;
  expires: string;
  user: User;
};

type User = {
  id: string;
  name?: string;
  email: string;
  emailVerified?: string;
  image?: string;
  accounts: Account[];
  sessions: Session[];
  Post: Post[];
  comment: Comments[];
};

type VerificationToken = {
  identifier: string;
  token: string;
  expires: string;
};

type Category = {
  id: string;
  slug: string;
  title: string;
  img?: string;
};

type Post = {
  id: string;
  createdAt: string;
  slug: string;
  title: string;
  desc: string;
  img?: string;
  views: number;
  catSlug: string;

  userEmail: String;
};

type Comments = {
  id: string;
  createdAt: string;
  desc: string;
  userEmail: string;

  postSlug: string;
};
