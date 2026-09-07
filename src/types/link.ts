export type PlatformId =
  | "custom"
  | "git"
  | "github"
  | "gitlab"
  | "gitea"
  | "codeberg"
  | "bitbucket"
  | "youtube"
  | "linkedin"
  | "x"
  | "instagram"
  | "facebook"
  | "reddit"
  | "pinterest"
  | "tiktok"
  | "twitch"
  | "discord"
  | "telegram"
  | "whatsapp"
  | "medium"
  | "devto"
  | "hashnode"
  | "stackoverflow"
  | "dribbble"
  | "behance"
  | "figma"
  | "notion"
  | "spotify"
  | "soundcloud"
  | "vimeo"
  | "producthunt"
  | "substack"
  | "mastodon"
  | "threads"
  | "bluesky"
  | "leetcode"
  | "hackerrank"
  | "npm"
  | "replit"
  | "unsplash"
  | "patreon";

export type SavedLink = {
  id: string;
  title: string;
  url: string;
  platformId: PlatformId;
  collection: string;
  tags: string[];
  note: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LinkDraft = Omit<SavedLink, "id" | "createdAt" | "updatedAt">;
