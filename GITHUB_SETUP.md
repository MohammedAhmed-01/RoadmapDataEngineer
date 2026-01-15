# GitHub Setup & Deployment Guide

Quick step-by-step guide to get your Data Engineering Roadmap on GitHub and deployed live.

## 🚀 5-Minute Setup

### Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: `data-engineer-roadmap`
3. **Description**: "A comprehensive Data Engineering learning roadmap for beginners"
4. **Visibility**: Public (recommended for learning resources)
5. Click **Create repository**

### Step 2: Push Your Code to GitHub

```bash
# Navigate to your project
cd /home/ubuntu/data_engineer_roadmap

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/data-engineer-roadmap.git

# Rename branch to main if needed
git branch -M main

# Push your code
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - Source: Select **GitHub Actions**
5. Save

### Step 4: Verify Deployment

1. Go to **Actions** tab in your repository
2. Wait for the workflow to complete (green checkmark)
3. Your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/data-engineer-roadmap
   ```

---

## 📋 Detailed Steps with Screenshots

### Creating the Repository

```
1. Visit github.com
2. Click "+" icon → "New repository"
3. Fill in:
   - Repository name: data-engineer-roadmap
   - Description: A comprehensive Data Engineering learning roadmap
   - Choose: Public
4. Click "Create repository"
```

### Pushing Code

```bash
# In your terminal, navigate to the project
cd /home/ubuntu/data_engineer_roadmap

# Check git status
git status

# If not initialized, initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Data Engineering Roadmap website"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/data-engineer-roadmap.git

# Push to GitHub
git push -u origin main
```

### Enabling GitHub Pages

```
1. Repository → Settings
2. Left sidebar → Pages
3. Build and deployment → Source → GitHub Actions
4. Wait for deployment to complete
5. Your URL: https://YOUR_USERNAME.github.io/data-engineer-roadmap
```

---

## ✅ Verification Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to main branch
- [ ] GitHub Pages enabled
- [ ] GitHub Actions workflow completed successfully
- [ ] Site is live at your GitHub Pages URL
- [ ] All images load correctly
- [ ] Links to YouTube resources work
- [ ] Responsive design works on mobile

---

## 🔄 Making Updates

After your initial setup, updating is easy:

```bash
# Make changes locally
# Edit files as needed

# Commit changes
git add .
git commit -m "Update: Add new learning resources"

# Push to GitHub
git push origin main
```

Your site will automatically redeploy within seconds!

---

## 🐛 Troubleshooting

### "fatal: remote origin already exists"
```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/YOUR_USERNAME/data-engineer-roadmap.git
```

### Workflow fails to build
1. Check **Actions** tab for error messages
2. Ensure `pnpm` is installed: `npm install -g pnpm`
3. Try building locally: `pnpm install && pnpm build`

### Site shows 404
1. Check GitHub Pages is enabled (Settings → Pages)
2. Verify source is set to "GitHub Actions"
3. Wait for workflow to complete (check Actions tab)

### Images not loading
1. Ensure images are in `client/public/images/`
2. Check image paths use absolute paths: `/images/filename.png`
3. Rebuild: `git add . && git commit -m "Fix images" && git push`

### Styles look wrong
1. Ensure Tailwind CSS built correctly
2. Clear browser cache (Ctrl+Shift+Delete)
3. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

## 📊 Monitoring Your Deployment

### Check Deployment Status
1. Go to your repository
2. Click **Actions** tab
3. See all workflow runs
4. Click on a run to see logs

### View Live Site
- GitHub Pages URL: `https://YOUR_USERNAME.github.io/data-engineer-roadmap`
- Custom domain: [See GitHub Pages docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

## 🎯 Next Steps

### After Deployment

1. **Share Your Site**
   - Share the GitHub Pages URL with friends
   - Add to your portfolio
   - Share on social media

2. **Add Custom Domain** (Optional)
   - Purchase a domain (e.g., data-engineer-roadmap.com)
   - Configure in GitHub Pages settings
   - [Full guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

3. **Track Analytics** (Optional)
   - Add Google Analytics
   - Monitor visitor engagement

4. **Improve Content**
   - Gather user feedback
   - Add more resources
   - Update learning stages

---

## 💡 Pro Tips

1. **Keep README Updated** - Update README.md with your live URL
2. **Use Meaningful Commits** - Write clear commit messages
3. **Test Before Pushing** - Run `pnpm build` locally first
4. **Monitor Actions** - Check Actions tab after each push
5. **Backup Your Work** - Keep local copies of important files

---

## 🔗 Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Your Repository](https://github.com/YOUR_USERNAME/data-engineer-roadmap)

---

## 📞 Need Help?

1. Check the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for more options
2. Review [GitHub Pages Troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-common-issues-with-github-pages)
3. Open an issue on your GitHub repository

---

**Your Data Engineering Roadmap is now live! 🎉**

Share it with aspiring data engineers and help them learn!
