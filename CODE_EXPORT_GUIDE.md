# Code Export & GitHub Deployment Guide

Complete guide to export your Data Engineering Roadmap code to GitHub and deploy it live.

## 📋 Table of Contents

1. [Quick Start (5 minutes)](#quick-start)
2. [Full Setup Guide](#full-setup-guide)
3. [Deployment Options](#deployment-options)
4. [Project Structure](#project-structure)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Prerequisites
- GitHub account (free at [github.com](https://github.com))
- Git installed on your computer
- Terminal/Command Prompt access

### 5-Minute Setup

```bash
# 1. Navigate to your project
cd /home/ubuntu/data_engineer_roadmap

# 2. Create GitHub repository at https://github.com/new
#    Name: data-engineer-roadmap
#    Visibility: Public

# 3. Add remote and push code
git remote add origin https://github.com/YOUR_USERNAME/data-engineer-roadmap.git
git branch -M main
git push -u origin main

# 4. Enable GitHub Pages
#    Go to: Settings → Pages → Source: GitHub Actions

# 5. Wait for deployment (check Actions tab)

# 6. Your site is live at:
#    https://YOUR_USERNAME.github.io/data-engineer-roadmap
```

---

## 📖 Full Setup Guide

### Step 1: Create GitHub Repository

**Online (via GitHub):**

1. Go to [github.com/new](https://github.com/new)
2. Fill in:
   - **Repository name**: `data-engineer-roadmap`
   - **Description**: "A comprehensive Data Engineering learning roadmap for beginners"
   - **Visibility**: Public
3. Click **Create repository**
4. Copy the repository URL (e.g., `https://github.com/YOUR_USERNAME/data-engineer-roadmap.git`)

### Step 2: Push Your Code

**Terminal/Command Prompt:**

```bash
# Navigate to project directory
cd /home/ubuntu/data_engineer_roadmap

# Initialize git (if not already done)
git init

# Configure git (one-time setup)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Data Engineering Roadmap website"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/data-engineer-roadmap.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Expected Output:**
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
Delta compression using up to X threads
Compressing objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), X.XX MiB | X.XX MiB/s, done.
Total XX (delta XX), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (XX/XX), done.
To https://github.com/YOUR_USERNAME/data-engineer-roadmap.git
 * [new branch]      main -> main
Branch 'main' is set up to track remote branch 'main' from 'origin'.
```

### Step 3: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source**: Select **GitHub Actions**
5. Save

### Step 4: Verify Deployment

1. Go to **Actions** tab
2. Wait for workflow to complete (green checkmark ✓)
3. Your site is live at:
   ```
   https://YOUR_USERNAME.github.io/data-engineer-roadmap
   ```

---

## 🌐 Deployment Options

### Option A: GitHub Pages (Free, Included)

**Pros:**
- Free hosting
- Automatic deployment on push
- No setup required (just enable in Settings)
- GitHub Actions workflow included

**Cons:**
- Static sites only (no backend)
- Limited customization

**URL Format:**
```
https://YOUR_USERNAME.github.io/data-engineer-roadmap
```

**Setup:** Already configured in `.github/workflows/deploy.yml`

---

### Option B: Vercel (Recommended)

**Pros:**
- Free tier with generous limits
- Automatic deployments
- Better performance
- Preview deployments for PRs
- Custom domains supported

**Cons:**
- Requires Vercel account
- Need to connect GitHub

**Steps:**

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign up** → **Continue with GitHub**
3. Authorize Vercel
4. Click **Add New** → **Project**
5. Select your repository
6. Click **Deploy**

**Your URL:**
```
https://data-engineer-roadmap.vercel.app
```

---

### Option C: Netlify

**Pros:**
- Free hosting
- Easy setup
- Good performance
- Custom domains

**Cons:**
- Requires account
- Different build configuration

**Steps:**

1. Go to [netlify.com](https://netlify.com)
2. Click **Sign up** → **GitHub**
3. Authorize Netlify
4. Click **Add new site** → **Import an existing project**
5. Select your repository
6. Configure:
   - Build command: `pnpm build`
   - Publish directory: `dist`
7. Click **Deploy site**

**Your URL:**
```
https://data-engineer-roadmap.netlify.app
```

---

## 📁 Project Structure

```
data-engineer-roadmap/
│
├── .github/
│   └── workflows/
│       └── deploy.yml                 # GitHub Actions workflow
│
├── client/
│   ├── public/
│   │   ├── images/
│   │   │   ├── hero-banner.png       # Hero section image
│   │   │   ├── python-section.png    # Python section image
│   │   │   ├── database-section.png  # Database section image
│   │   │   ├── big-data-section.png  # Big Data section image
│   │   │   └── cloud-section.png     # Cloud section image
│   │   └── .gitkeep
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── RoadmapCard.tsx       # Individual stage card component
│   │   │   ├── ErrorBoundary.tsx     # Error handling
│   │   │   └── ui/                   # shadcn/ui components
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.tsx              # Main roadmap page
│   │   │   └── NotFound.tsx          # 404 page
│   │   │
│   │   ├── lib/
│   │   │   └── roadmapData.ts        # Roadmap content and resources
│   │   │
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx      # Theme management
│   │   │
│   │   ├── hooks/
│   │   │   └── useTheme.ts           # Theme hook
│   │   │
│   │   ├── App.tsx                   # Main app component
│   │   ├── main.tsx                  # React entry point
│   │   └── index.css                 # Global styles and theme
│   │
│   └── index.html                    # HTML template
│
├── server/
│   └── index.ts                      # Server placeholder (not used in static)
│
├── shared/
│   └── const.ts                      # Shared constants
│
├── package.json                      # Dependencies and scripts
├── vite.config.ts                   # Vite build configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
├── .prettierrc                       # Code formatting rules
├── .gitignore                        # Git ignore rules
│
├── README.md                         # Project documentation
├── DEPLOYMENT_GUIDE.md              # Detailed deployment guide
├── GITHUB_SETUP.md                  # GitHub setup guide
└── CODE_EXPORT_GUIDE.md            # This file
```

---

## 🔧 Key Files Explained

### `package.json`
- Lists all project dependencies
- Defines build scripts (`pnpm build`, `pnpm dev`)
- Specifies Node.js version requirements

### `vite.config.ts`
- Vite build tool configuration
- Handles React, TypeScript, and CSS processing

### `tailwind.config.ts`
- Tailwind CSS configuration
- Defines custom theme colors and spacing

### `client/src/lib/roadmapData.ts`
- Contains all 11 learning stages
- Each stage has resources, icons, and descriptions
- Easy to modify and add new stages

### `.github/workflows/deploy.yml`
- GitHub Actions workflow
- Automatically builds and deploys on push
- Runs tests and type checking

---

## 📝 Making Updates

After initial deployment, updating is simple:

```bash
# Make changes to your code
# Edit files as needed

# Stage changes
git add .

# Commit with a message
git commit -m "Update: Add new resources to Python stage"

# Push to GitHub
git push origin main
```

**Automatic Deployment:**
- GitHub Actions will automatically rebuild and deploy
- Check **Actions** tab to see progress
- Site updates within 1-2 minutes

---

## 🎯 Common Tasks

### Add a New Learning Stage

Edit `client/src/lib/roadmapData.ts`:

```typescript
{
  id: 12,
  title: 'Your New Topic',
  description: 'Description of the learning stage',
  resources: [
    {
      id: 'resource-1',
      name: 'Resource Name',
      url: 'https://youtube.com/...',
      type: 'video' | 'playlist',
    },
  ],
  icon: '🎓',
  color: 'from-blue-400 to-blue-600',
  backgroundImage: '/images/your-image.png',
}
```

### Change Colors

Edit `client/src/index.css` and update CSS variables:

```css
:root {
  --primary: #06b6d4;        /* Change this */
  --background: #1a2332;     /* Or this */
  /* ... other colors ... */
}
```

### Update Hero Image

1. Replace `client/public/images/hero-banner.png`
2. Commit and push
3. Site automatically updates

---

## 🐛 Troubleshooting

### "fatal: remote origin already exists"

```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/YOUR_USERNAME/data-engineer-roadmap.git
```

### GitHub Actions workflow fails

1. Check **Actions** tab for error details
2. Common issues:
   - Node.js version mismatch
   - Missing dependencies
   - Syntax errors in code

**Solution:**
```bash
# Test locally first
pnpm install
pnpm build
```

### Site shows 404

1. Verify GitHub Pages is enabled (Settings → Pages)
2. Check source is "GitHub Actions"
3. Wait for workflow to complete
4. Hard refresh browser (Ctrl+Shift+R)

### Images not loading

1. Check images are in `client/public/images/`
2. Verify paths use absolute paths: `/images/filename.png`
3. Rebuild: `git add . && git commit -m "Fix" && git push`

### Styles look broken

1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R)
3. Check Tailwind CSS built: `pnpm build`

---

## 📊 Monitoring Deployment

### Check Build Status

1. Go to your GitHub repository
2. Click **Actions** tab
3. See all workflow runs
4. Click on a run for detailed logs

### View Live Site

- **GitHub Pages**: `https://YOUR_USERNAME.github.io/data-engineer-roadmap`
- **Vercel**: `https://data-engineer-roadmap.vercel.app`
- **Netlify**: `https://data-engineer-roadmap.netlify.app`

---

## 🔐 Security & Best Practices

1. **Never commit secrets** - Use environment variables
2. **Keep dependencies updated** - Run `pnpm update` regularly
3. **Test before pushing** - Run `pnpm build` locally
4. **Use meaningful commits** - Clear commit messages help track changes
5. **Review before merge** - Use pull requests for changes

---

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Pages Guide](https://docs.github.com/en/pages)
- [GitHub Actions Guide](https://docs.github.com/en/actions)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)

---

## ✅ Deployment Checklist

- [ ] GitHub account created
- [ ] Repository created on GitHub
- [ ] Code pushed to main branch
- [ ] GitHub Pages enabled
- [ ] GitHub Actions workflow completed
- [ ] Site is live and accessible
- [ ] All images load correctly
- [ ] YouTube links work
- [ ] Responsive design verified
- [ ] README updated with live URL

---

## 🎉 You're Done!

Your Data Engineering Roadmap is now live on GitHub and deployed to the web!

**Next Steps:**
1. Share your live URL
2. Gather feedback from users
3. Make improvements based on feedback
4. Consider adding more features
5. Help other aspiring data engineers!

---

## 📞 Need Help?

1. Check [GITHUB_SETUP.md](./GITHUB_SETUP.md) for quick setup
2. Review [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed options
3. Check [GitHub Docs](https://docs.github.com)
4. Open an issue on your repository

---

**Happy Coding! 🚀**
