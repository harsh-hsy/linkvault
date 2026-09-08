export const faqCategories = [
  {
    id: "getting-started",
    title: "Getting started",
    description: "The basics of using LinkVault and saving your first links.",
    items: [
      {
        question: "Is LinkVault free to use?",
        answer: "Yes. LinkVault is currently free to use, with no subscription or paid account.",
        featured: true,
      },
      {
        question: "Do I need to create an account?",
        answer: "No. You can start saving and organizing links immediately without signing in.",
        featured: true,
      },
      {
        question: "What kind of links can I save?",
        answer:
          "You can save regular HTTP or HTTPS website links, including articles, tools, videos, documentation, profiles, and project pages.",
      },
      {
        question: "What is the difference between a platform and a custom website?",
        answer:
          "A supported platform provides a familiar icon and may let you build a profile URL from a username. Custom websites accept a complete URL and try to display the website's favicon.",
      },
    ],
  },
  {
    id: "organizing-links",
    title: "Organizing links",
    description: "Collections, tags, favorites, search, and everyday link management.",
    items: [
      {
        question: "How are collections different from tags?",
        answer:
          "A link can belong to one collection as its main location and can have multiple tags for additional context and search terms.",
      },
      {
        question: "What does LinkVault search?",
        answer: "Search checks each saved link's title, URL, tags, and note.",
      },
      {
        question: "What happens to links when I delete a collection?",
        answer:
          "The links remain saved. LinkVault removes the deleted collection from those links and leaves them unassigned.",
      },
      {
        question: "Can I edit or favorite an existing link?",
        answer:
          "Yes. Use the star to add or remove a favorite, and open the card menu to edit other saved details.",
      },
    ],
  },
  {
    id: "privacy-and-data",
    title: "Privacy and data",
    description: "Where your library is stored and what local-first means in practice.",
    items: [
      {
        question: "Where are my links stored?",
        answer:
          "Your links and collections are stored in localStorage inside the browser profile where you use LinkVault. They are not saved to a LinkVault application backend.",
        featured: true,
      },
      {
        question: "Are my links synced between devices?",
        answer:
          "No. Each device, browser, and browser profile keeps its own local library. LinkVault does not currently provide automatic sync.",
        featured: true,
      },
      {
        question: "What happens if I clear browser data?",
        answer:
          "Clearing LinkVault site data can permanently remove your saved links, collections, and theme preference from that browser.",
        featured: true,
      },
      {
        question: "Does LinkVault make any external requests?",
        answer:
          "The website needs normal hosting and font requests. Custom link cards may also request favicon files directly from the saved website, and opening a link connects to its destination.",
      },
      {
        question: "Can I back up and restore my library?",
        answer:
          "Not yet. A dedicated backup and restore flow is planned, so avoid clearing site data if you need to keep the current library.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation and offline use",
    description: "Using LinkVault as an installed web app on mobile and desktop.",
    items: [
      {
        question: "Can I install LinkVault on my phone?",
        answer:
          "Yes. Supported mobile browsers can add LinkVault to your home screen and open it in a standalone app window.",
        featured: true,
      },
      {
        question: "Can I install LinkVault on a desktop computer?",
        answer:
          "Yes. Supported desktop browsers such as Chrome and Edge can offer an install action in the address bar or browser menu.",
      },
      {
        question: "Does LinkVault work offline?",
        answer:
          "The app interface can be cached after a successful visit, but external websites saved in your library still require an internet connection to open.",
      },
      {
        question: "Why is the install option not visible?",
        answer:
          "The option may be unavailable if the browser does not support installation, the page has not fully loaded, or LinkVault is already installed.",
      },
    ],
  },
];
export const landingFaqs = faqCategories.flatMap((category) =>
  category.items.filter((item) => item.featured),
);
