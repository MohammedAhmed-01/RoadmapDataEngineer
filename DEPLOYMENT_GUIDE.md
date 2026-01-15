# Data Engineering Roadmap - GitHub Deployment Guide

This guide will help you export your project to GitHub and deploy it to production.

## Option 1: Export to GitHub via Manus UI (Recommended)

### Step 1: Access GitHub Export in Manus
1. Open your project in Manus
2. Click the **Settings** icon in the Management UI (right panel)
3. Navigate to the **GitHub** tab
4. Click **Export to GitHub**

### Step 2: Configure GitHub Export
1. Select your GitHub account (you'll need to authenticate if not already connected)
2. Choose the repository owner (your personal account or organization)
3. Enter a repository name (e.g., `data-engineer-roadmap`)
4. Choose visibility: Public or Private
5. Click **Export**

Manus will automatically:
- Create a new GitHub repository
- Push all your project files
- Set up the repository structure

---

## Option 2: Manual GitHub Setup (If Exporting Manually)

### Step 1: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Enter repository name: `data-engineer-roadmap`
3. Add description: "A comprehensive Data Engineering learning roadmap for beginners"
4. Choose visibility (Public recommended for learning resources)
5. Click **Create repository**

### Step 2: Clone and Push Your Code
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/data-engineer-roadmap.git
cd data-engineer-roadmap

# Copy your project files here
# Then push to GitHub
git add .
git commit -m "Initial commit: Data Engineering Roadmap website"
git branch -M main
git push -u origin main
```

---

## Deployment Options

### Option A: Deploy on GitHub Pages (Free, Static Only)

GitHub Pages automatically deploys your static site for free.

#### Step 1: Configure Build Settings
1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select **GitHub Actions**
   - This enables automatic deployment

#### Step 2: Create GitHub Actions Workflow
Create a file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build project
        run: pnpm build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### Step 3: Push and Deploy
```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

Your site will be live at: `https://YOUR_USERNAME.github.io/data-engineer-roadmap`

---

### Option B: Deploy on Vercel (Recommended for React Apps)

Vercel offers free hosting with automatic deployments and better performance.

#### Step 1: Connect Vercel to GitHub
1. Go to [vercel.com](https://vercel.com)
2. Click **Sign up** and choose **Continue with GitHub**
3. Authorize Vercel to access your GitHub account

#### Step 2: Import Your Project
1. Click **Add New** → **Project**
2. Select your `data-engineer-roadmap` repository
3. Vercel will auto-detect it's a Vite project
4. Click **Deploy**

Your site will be live at: `https://data-engineer-roadmap.vercel.app`

**Benefits:**
- Automatic deployments on every push to `main`
- Preview deployments for pull requests
- Automatic SSL certificates
- Better performance with edge caching

---

### Option C: Deploy on Netlify

Similar to Vercel, Netlify offers free hosting with great features.

#### Step 1: Connect Netlify to GitHub
1. Go to [netlify.com](https://netlify.com)
2. Click **Sign up** and choose **GitHub**
3. Authorize Netlify

#### Step 2: Deploy Your Site
1. Click **Add new site** → **Import an existing project**
2. Select your GitHub repository
3. Configure build settings:
   - Build command: `pnpm build`
   - Publish directory: `dist`
4. Click **Deploy site**

Your site will be live at: `https://data-engineer-roadmap.netlify.app`

---

## Project Structure for Deployment

```
data-engineer-roadmap/
├── client/
│   ├── public/
│   │   └── images/          # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── lib/             # Utilities and data
│   │   ├── App.tsx          # Main app
│   │   └── index.css        # Global styles
│   └── index.html           # HTML entry point
├── package.json             # Dependencies
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS config
└── tsconfig.json           # TypeScript config
```

---

## Build and Test Locally Before Deployment

### Build the Project
```bash
cd /home/ubuntu/data_engineer_roadmap
pnpm build
```

This creates a `dist/` folder with production-ready files.

### Preview Production Build
```bash
pnpm preview
```

Visit `http://localhost:4173` to test the production build.

---

## Environment Variables

This project doesn't require environment variables for basic deployment. However, if you add backend features later, create a `.env` file:

```env
VITE_API_URL=https://your-api.com
```

---

## Troubleshooting

### Build Fails
1. Ensure Node.js 18+ is installed
2. Clear cache: `pnpm store prune`
3. Reinstall: `pnpm install`

### Images Not Loading
- Ensure all images are in `client/public/images/`
- Check image paths use absolute paths: `/images/filename.png`

### Styles Not Applied
- Run `pnpm build` to ensure Tailwind CSS is compiled
- Check that `client/src/index.css` is imported in `client/src/main.tsx`

---

## Recommended Deployment Flow

1. **Development**: Make changes locally, test with `pnpm dev`
2. **Commit**: `git add . && git commit -m "Your message"`
3. **Push**: `git push origin main`
4. **Deploy**: Automatic deployment via GitHub Actions/Vercel/Netlify
5. **Monitor**: Check deployment logs and live site

---

## Next Steps

After deployment:
1. Share your live URL with others
2. Monitor analytics (if enabled)
3. Collect feedback from users
4. Iterate and improve based on feedback
5. Consider adding features like progress tracking or user accounts

For questions or issues, refer to the official documentation:
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
