import { useState } from "react";
import { ArrowRight, Globe2, Search } from "lucide-react";
import { platforms, type Platform } from "@/data/platforms";
import "./PlatformPicker.css";

type PlatformPickerProps = {
  onSelect: (platform: Platform) => void;
};

export function PlatformPicker({ onSelect }: PlatformPickerProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const customPlatform = platforms[0];
  const supportedPlatforms = platforms.slice(1);
  const searchResults = normalizedQuery
    ? platforms
        .slice(1)
        .filter((platform) =>
          [platform.name, platform.id, ...platform.keywords]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery),
        )
        .sort((firstPlatform, secondPlatform) => {
          const firstStartsWithQuery = firstPlatform.name.toLowerCase().startsWith(normalizedQuery);
          const secondStartsWithQuery = secondPlatform.name
            .toLowerCase()
            .startsWith(normalizedQuery);
          return Number(secondStartsWithQuery) - Number(firstStartsWithQuery);
        })
    : [];

  return (
    <div className="platform-step">
      <div className="platform-search-row">
        <label className="platform-search">
          <span className="sr-only">Search websites or platforms</span>
          <Search aria-hidden="true" />
          <input
            autoFocus
            value={query}
            placeholder="Search websites or platforms..."
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <button
          className="custom-platform-button"
          type="button"
          onClick={() => onSelect(customPlatform)}
        >
          <Globe2 aria-hidden="true" />
          <span>Custom</span>
          <ArrowRight aria-hidden="true" />
        </button>
      </div>

      {normalizedQuery ? (
        <div className="platform-results">
          <p className="platform-section-title">
            {searchResults.length} {searchResults.length === 1 ? "result" : "results"} for “
            {query.trim()}”
          </p>
          {searchResults.length > 0 ? (
            <div className="platform-result-list">
              {searchResults.map((platform) => (
                <PlatformResult key={platform.id} platform={platform} onSelect={onSelect} />
              ))}
            </div>
          ) : (
            <div className="platform-empty">
              <p>No matching platform</p>
              <span>Use Custom to save any website URL.</span>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="platform-section-title">All platforms</p>
          <div className="platform-grid" aria-label="Supported platforms">
            {supportedPlatforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <button key={platform.id} type="button" onClick={() => onSelect(platform)}>
                  <span className="platform-grid-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span>{platform.name}</span>
                </button>
              );
            })}
          </div>
          <p className="platform-hint">
            Scroll to explore all {supportedPlatforms.length} supported platforms.
          </p>
        </div>
      )}
    </div>
  );
}

type PlatformResultProps = {
  platform: Platform;
  onSelect: (platform: Platform) => void;
};

function PlatformResult({ platform, onSelect }: PlatformResultProps) {
  const Icon = platform.icon;

  return (
    <button type="button" onClick={() => onSelect(platform)}>
      <span className="result-platform-icon">
        <Icon aria-hidden="true" />
      </span>
      <span>
        <strong>{platform.name}</strong>
        <small>{platform.keywords.slice(0, 3).join(" · ")}</small>
      </span>
      <ArrowRight aria-hidden="true" />
    </button>
  );
}
