export interface UserGuide {
  id: number;
  attributes: {
    userGuide: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    Title: string;
  };
}

export interface StrapiApp {
  id: number;
    attributes: {
      description: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      locale: string;
      title: string;
  };
}
