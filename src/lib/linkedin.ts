/**
 * Validates if a URL is a valid LinkedIn post URL
 * @param urlStr - The URL string to validate
 * @returns true if the URL is a valid LinkedIn post URL, false otherwise
 */
export function isValidLinkedInUrl(urlStr: string): boolean {
  try {
    const url = new URL(urlStr.trim());

    // Check if it's a linkedin.com domain
    if (!url.hostname.includes("linkedin.com")) {
      return false;
    }

    const path = url.pathname;

    // Check if it's a post URL (either /posts/ or /feed/update/)
    const isPost = path.startsWith("/posts/") || path.includes("/feed/update/");

    return isPost;
  } catch (e) {
    // Invalid URL format
    return false;
  }
}
