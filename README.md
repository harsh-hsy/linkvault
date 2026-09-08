# LinkVault

> Save it once. Find it instantly.

LinkVault is a private, local-first bookmark manager for saving, organizing, and finding important links. It works without an account or backend and keeps the link library inside the user's browser.

**Live website:** [getlinkvault.pages.dev](https://getlinkvault.pages.dev)

**Open the app:** [getlinkvault.pages.dev/app](https://getlinkvault.pages.dev/app)

## Features

- Add, edit, delete, open, and copy saved links
- Organize links with collections and tags
- Move links between collections from the card menu
- Search across titles, URLs, tags, notes, and collections
- Filter by collection or favorites
- Grid and list views with title and date sorting
- Platform picker with recognizable platform icons
- Automatic favicon lookup for custom websites
- Default collections with support for custom collections
- Matte light and dark themes
- Responsive desktop, tablet, and mobile interface
- Installable Progressive Web App (PWA)
- Local persistence with `localStorage`

## Public pages

| Route | Purpose |
| --- | --- |
| `/` | Product landing page |
| `/app` | Link library |
| `/features` | Feature overview |
| `/guide` | Product usage guide |
| `/install` | PWA installation instructions |
| `/privacy` | Local storage and privacy details |
| `/faq` | Common questions |
| `/terms` | Terms and conditions |

## Privacy and storage

LinkVault has no application backend. Links and collections are stored in the browser using `localStorage` and are not automatically synced between devices.

Clearing browser or site data can permanently remove the saved library. Backup and restore is planned but is not available yet.

## Tech stack

- React 19
- JavaScript and JSX
- Vite 8
- Lucide React and React Icons
- Plain CSS organized by component and page
- Cloudflare Pages

## Local development

Requirements:

- Node.js 20.19 or newer
- npm

Clone and run the project:

```bash
git clone https://github.com/harsh-hsy/linkvault.git
cd linkvault
npm install
npm run dev
```

Vite will print the local development URL in the terminal, usually `http://localhost:5173`.

## Available commands

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run lint      # Check source files
npm run format    # Format source files
```

## Project structure

```text
linkvault/
├── public/                  # PWA icons, manifest, redirects, robots and sitemap
├── src/
│   ├── components/
│   │   ├── collections/    # Collection dialogs and picker
│   │   ├── common/         # Shared controls and dialogs
│   │   ├── layout/         # App shell, headers, sidebar and footer
│   │   └── links/          # Link form, cards, actions and platform picker
│   ├── data/               # Platform and FAQ content
│   ├── hooks/              # Link and collection persistence
│   ├── lib/                # URL and favicon helpers
│   ├── pages/              # Landing and information pages
│   ├── styles/             # Shared tokens and global styles
│   └── main.jsx            # Application entry and route selection
├── index.html
├── jsconfig.json
└── vite.config.js
```

## Production build

```bash
npm run build
```

The deployable website is generated in the `dist` directory.

## Cloudflare Pages deployment

Use these settings when connecting the GitHub repository to Cloudflare Pages:

```text
Production branch: main
Build command: npm run build
Build output directory: dist
```

The `public/_redirects` file sends direct route requests back to the React application, so routes such as `/app`, `/privacy`, and `/guide` work after deployment and browser refreshes.

## Author

Made by [Harsh Singh](https://harsh-hsy.onrender.com).
