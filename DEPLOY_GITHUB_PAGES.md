# GitHub Pages Deployment Instructions

Since GitHub CLI is not available, follow these manual steps to deploy to GitHub Pages:

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `erharts-catering-static`
3. Description: "Erhart's Catering - Responsive Static Website"
4. Set to **Public**
5. Don't initialize with README (we already have one)
6. Click "Create repository"

## Step 2: Push Code to GitHub

Run these commands in the terminal:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/erharts-catering-static.git

# Push the code
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)
4. Under "Source", select:
   - Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

## Step 4: Access Your Site

After a few minutes, your site will be available at:
```
https://YOUR_USERNAME.github.io/erharts-catering-static/
```

## Alternative: Using GitHub Desktop

If you prefer a GUI:
1. Download GitHub Desktop from https://desktop.github.com/
2. Add your local repository
3. Commit and push to GitHub
4. Follow Step 3 above to enable Pages

## Troubleshooting

- **404 errors**: Make sure GitHub Pages is enabled and deployed
- **CSS not loading**: Check that paths are relative, not absolute
- **Images not showing**: Verify case sensitivity in file names
- **Site not updating**: Clear browser cache or wait a few minutes

## Update Site

To update the site after making changes:
```bash
git add .
git commit -m "Update site content"
git push
```

Changes will appear on GitHub Pages within a few minutes.