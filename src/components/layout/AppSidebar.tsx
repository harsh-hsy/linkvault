import {
  Archive,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  FolderPlus,
  Link2,
  Settings,
  Star,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";

const collections = [
  { name: "Work", count: 12, color: "#3b82f6", icon: BriefcaseBusiness },
  { name: "Learning", count: 9, color: "#f59e0b", icon: BookOpen },
  { name: "Development", count: 15, color: "#8b5cf6", icon: Code2 },
  { name: "Personal", count: 6, color: "#10b981", icon: UserRound },
];

type AppSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  return (
    <>
      {isOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? "is-open" : ""}`}>
        <div className="brand-row">
          <div className="brand">
            <span className="brand-mark">
              <Link2 aria-hidden="true" />
            </span>
            <span>LinkVault</span>
          </div>
          <button
            className="icon-button sidebar-close"
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <div>
            <SidebarItem icon={Archive} label="All links" count={42} active />
            <SidebarItem icon={Star} label="Favorites" count={8} />
          </div>

          <div className="collections">
            <div className="section-label">
              <span>Collections</span>
              <button type="button" aria-label="Create collection">
                <FolderPlus aria-hidden="true" />
              </button>
            </div>

            {collections.map((collection) => (
              <SidebarItem
                key={collection.name}
                icon={collection.icon}
                label={collection.name}
                count={collection.count}
                color={collection.color}
              />
            ))}
          </div>

          <div className="sidebar-bottom">
            <SidebarItem icon={Settings} label="Settings" />
          </div>
        </nav>

        <div className="privacy-note">
          <strong>Private by design</strong>
          <span>Your links stay in this browser.</span>
        </div>
      </aside>
    </>
  );
}

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  count?: number;
  color?: string;
  active?: boolean;
};

function SidebarItem({ icon: Icon, label, count, color, active }: SidebarItemProps) {
  return (
    <button className={`sidebar-item ${active ? "is-active" : ""}`} type="button">
      <span className="sidebar-item-icon">
        <Icon aria-hidden="true" />
        {color && <i style={{ backgroundColor: color }} />}
      </span>
      <span>{label}</span>
      {count !== undefined && <small>{count}</small>}
    </button>
  );
}
