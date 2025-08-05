# Browser Cache Clearing Instructions

The demo has been updated to show 347 pages processed with 20 total files, but your browser is showing the old version.

## Try these steps IN ORDER:

1. **Hard Refresh**: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

2. **Clear Browser Data for localhost**:
   - Chrome: F12 → Application tab → Storage → Clear site data
   - Firefox: F12 → Storage tab → Clear All
   - Safari: Develop menu → Empty Caches

3. **Incognito/Private Window**:
   - Open a new private/incognito window
   - Paste your demo URL

4. **Different Browser**:
   - Try Chrome if using Firefox, or vice versa

5. **Browser Developer Tools**:
   - F12 → Network tab → Disable cache checkbox
   - Refresh page

The server is definitely serving the updated components with 20 files (10 client + 10 opposing) and 347 pages processed. This is a browser caching issue.

Expected changes:
- Title: "📤 347 PAGES PROCESSED - 20 TOTAL FILES"
- File counts: 20 total documents (not 6)
- Analysis stats: 347 documents, 23 contradictions, 96% confidence