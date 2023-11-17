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
