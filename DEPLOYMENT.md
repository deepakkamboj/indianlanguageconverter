# GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages.

## Setup Instructions

1. **Enable GitHub Pages** in your repository:
   - Go to repository Settings → Pages
   - Under "Build and deployment", select **GitHub Actions** as the source

2. **Push to main branch**:
   - The workflow will automatically trigger on push to `main` branch
   - Or manually trigger from Actions tab

3. **Access your site**:
   - After deployment, your site will be available at:
   - `https://<username>.github.io/IndianLanguageConverter/`

## Local Development

The app is configured to work both locally and on GitHub Pages:

- **Local**: `npm run dev` (runs on http://localhost:3000)
- **Build locally**: `npm run build` (creates static export in `out/` folder)

## Configuration

- `next.config.ts`: Configured for static export with base path
- `.github/workflows/deploy.yml`: GitHub Actions workflow for deployment
