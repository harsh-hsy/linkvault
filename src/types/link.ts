export type PlatformId = "github" | "custom";

export type Link = {
  id: string;
  title: string;
  url: string;
  hostname: string;
  platformId: PlatformId;
  collection: string;
  collectionColor: string;
  tags: string[];
  note: string;
  isFavorite: boolean;
};
