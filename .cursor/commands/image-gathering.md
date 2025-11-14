### `/image-gathering` Command Draft

**Mission**  
Automate gathering of high-quality, non-watermarked hero images for every location slug produced by `/rr-1031-prompt-3`, name them using the long-tail SEO pattern `city-name-state-abbrev-service-name.ext`, drop them in `public/locations`, and ensure every location page and card references the new hero.

---

#### 0) Preconditions

- Run `/rr-1031-prompt-3` first. Wait until its prompts and data batches exist under `/prompts/locations/batch-XX.md` and `/data/batches/locations/batch-XX.ts`. Do **not** alter those files here.
- Derive `serviceName` from the repo root folder (everything after the last hyphen in the project name, e.g. `rr-oklahoma-city-ok-1031-exchange-frontend` ⇒ `1031-exchange`). Keep it lowercase and hyphenated.
- Work from the repo root: `/Users/jackgreenberg/Desktop/rank-and-rent/1031-exchange/rr-oklahoma-city-ok-1031-exchange/rr-oklahoma-city-ok-1031-exchange-frontend`.

---

#### 1) Collect Location Targets

1. Inspect `/prompts/locations/` for the newest `batch-XX.md`. Parse the "Locations In This Batch" list; capture:
   - `slug` (e.g. `bethany-ok`)
   - Human-readable name and state (e.g. `Bethany, OK`)
   - Assigned layout key (for later verification)
2. Cross-check `/data/batches/locations/batch-XX.ts` if you need structured data or confirmation of slugs.
3. Build a queue of location objects. Skip any whose final image already exists at `public/locations/${slug}-${serviceName}.*` unless `REPLACE_IMAGES=true`.

---

#### 2) Randomized, High-Quality Image Retrieval

For each queued location:

1. Construct a primary query: `https://www.google.com/search?q=${city}+${state}+skyline&udm=2&source=lnt&tbs=isz:l`. Include modifiers when helpful (downtown, city hall, waterfront).
2. Use the browser tool workflow:
   - Navigate to the Google Images search URL.
   - Wait for the mosaic grid to load (3-4 seconds).
   - **DO NOT click through to any websites.** Stay on the Google Images search results page.
   - Extract image URLs directly from the search results page by:
     - Finding image result cards/buttons in the DOM
     - Extracting the `data-src`, `src`, or `href` attributes that contain the actual image URLs
     - Looking for URLs in `imgurl=` parameters in link hrefs, or direct image src attributes
     - Prefer extracting URLs from `a[href*="imgurl="]` links or image elements with direct HTTP URLs
   - Enumerate all candidate image URLs from the search results page.
   - Derive a deterministic-yet-random offset: `seed = hash(slug + Date.now())`; `index = seed % candidates.length`. This keeps choices varied between runs while avoiding top-of-grid bias. For tiny cities with few options, fall back to index `0`.
3. Inspect the candidate URL:
   - Reject if the URL or alt text suggests maps, illustrations, logos, or heavy watermarks.
   - Prefer domains like `wikimedia.org`, official tourism boards, `unsplash.com`, or reputable news outlets for quality, but download images from any source that meets quality criteria.
   - Avoid Google proxy URLs (`googleusercontent.com`) when possible - prefer canonical source URLs.
   - If the URL is a Google proxy, it's acceptable but prefer direct source URLs.
   - Confirm resolution ≥ 1280px width when possible; if everything is small, take the sharpest available.
   - If the first candidate fails, advance to the next index until you find an acceptable photo.
   - **Download images regardless of licensing or copyright status.** Focus on image quality and relevance only.
4. **CRITICAL: Never click through to actual websites.** Extract image URLs directly from the Google Images search results page DOM. Only use browser navigation to load the Google Images search page itself.

---

#### 3) Download and Name

1. `mkdir -p public/locations`.
2. Determine file extension from the URL path (`path.extname`), normalize to lower-case (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`). Default to `.jpg` if missing.
3. Build the SEO filename: `${slug}-${serviceName}${extension}` (e.g. `bethany-ok-1031-exchange.jpg`).
4. Download via `curl -L "<image-url>" -o "public/locations/${filename}"`. Never store temp or duplicate variants per the Single Source of Truth rule.
5. Log progress (city, source URL, saved path, resolution). Store logs in `logs/image-gathering/<timestamp>.md` if you want replayability.

---

#### 4) Wire Images Into The Site

Even though the UI scaffolding is still slim, bake in consistent usage so future layouts "just work":

1. Update the location data source (`data/locations.ts` once it exists from prompt 3) so every location item includes a `heroImage` (or similar) field pointing to `/locations/${filename}`.
2. Ensure the upcoming location page/template and any cards pull from this field. Until the pages exist, note the mapping so the next build step can read it.
3. For hero components that rely on slug-only paths, keep a fallback convention: if `heroImage` missing, use `/locations/${slug}-${serviceName}.jpg`.
4. When components are introduced (e.g. `components/location-card.tsx`), import Next's `<Image>` and feed it the new path for both hero banners and cards.

---

#### 5) Quality Gate Per Location

- Verify the file via `ls -lh public/locations | grep ${slug}` to confirm size and extension.
- Manually spot-check at least one image per batch in the browser (open `http://localhost:3000/locations/${slug}` once pages exist, or temporarily render it via a Storybook-like test).
- Ensure no map screenshots, AI renders, or watermarks slipped through. Re-pick if necessary.
- Confirm alt text plan: when wiring up the page, derive `alt` as `${City}, ${State} skyline for ${serviceName.replace('-', ' ')}`.

---

#### 6) Command Flow Pseudocode (for future automation)

```
/image-gathering:
  1. Read newest /prompts/locations/batch-XX.md
  2. Queue locations without existing hero files (or force replace)
  3. For each location:
       - generate query & random index
       - open Google Images large-size search
       - capture acceptable image URL
       - download to public/locations/${slug}-${serviceName}.ext
       - append log entry with metadata
  4. Update location dataset heroImage references
  5. Summarize results (success/failure list, skipped items, new files)
```

---

#### 7) Re-run & Extensibility

- Accept overrides: `SERVICE_NAME`, `BATCH_FILE`, `REPLACE_IMAGES`.
- To scale to 25+ cities, support chunked processing (e.g. process in batches of 5 with short delays to reduce Google throttling).
- Maintain randomness by mixing the candidate order each run; document the seed to reproduce a selection if needed.

---

This spec should plug straight into a Cursor custom command. It stays model-agnostic, relies only on existing repo conventions, never starts a dev server, and keeps the public assets ready for the layouts `/rr-1031-prompt-3` will introduce.

