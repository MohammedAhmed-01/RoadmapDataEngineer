# Data Engineering Roadmap

A comprehensive, interactive learning roadmap for beginners to master data engineering from fundamentals to cloud deployment.

![Data Engineering Roadmap](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC)

## 🎯 Overview

This interactive roadmap guides beginners through 11 structured learning stages, each containing carefully curated YouTube resources and learning materials. The roadmap progresses from Python fundamentals through advanced topics like Big Data and Cloud Computing.

## 📚 Learning Stages

1. **Python Fundamentals** - Master core programming concepts
2. **Python Libraries for Data** - NumPy, Pandas, Matplotlib
3. **Version Control (Git & GitHub)** - Manage code and collaborate
4. **SQL & Databases** - Relational databases and queries
5. **Data Modeling & Visualization** - Design and visualize data
6. **NoSQL & Linux** - MongoDB and operating systems
7. **Docker & Containerization** - Package and deploy applications
8. **CI/CD & Automation** - GitLab CI/CD and GitHub Actions
9. **ETL Tools & Orchestration** - SSIS, Informatica, Apache Airflow
10. **Big Data & Distributed Systems** - Hadoop, Spark, Kafka
11. **Cloud Computing** - Deploy solutions in the cloud

## ✨ Features

- **Interactive Timeline** - Click to expand each stage and view learning resources
- **Modern Design** - Clean, minimalist interface with teal gradient accents
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile
- **Direct Resource Links** - Quick access to YouTube videos and playlists
- **Smooth Animations** - Engaging transitions and scroll effects
- **Progress Indicator** - Visual feedback as you scroll through the roadmap

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/data-engineer-roadmap.git
cd data-engineer-roadmap

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:5173` in your browser.

### Build for Production

```bash
# Build the project
pnpm build

# Preview production build
pnpm preview
```

## 📁 Project Structure

```
data-engineer-roadmap/
├── client/
│   ├── public/
│   │   └── images/              # Hero and section images
│   ├── src/
│   │   ├── components/
│   │   │   └── RoadmapCard.tsx  # Individual stage card
│   │   ├── pages/
│   │   │   └── Home.tsx         # Main page with timeline
│   │   ├── lib/
│   │   │   └── roadmapData.ts   # Roadmap content and resources
│   │   ├── App.tsx              # Main app component
│   │   ├── main.tsx             # React entry point
│   │   └── index.css            # Global styles and theme
│   └── index.html               # HTML template
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions workflow
├── package.json                 # Dependencies and scripts
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── DEPLOYMENT_GUIDE.md         # Detailed deployment instructions
└── README.md                   # This file
```

## 🛠️ Available Scripts

```bash
# Development
pnpm dev              # Start dev server
pnpm check            # TypeScript type checking
pnpm format           # Format code with Prettier

# Production
pnpm build            # Build for production
pnpm preview          # Preview production build
```

## 🎨 Design System

**Color Palette:**
- Background: Navy (#1a2332)
- Primary: Teal (#06b6d4)
- Secondary: Cyan (#0891b2)
- Text: Light (#f0f9fa)

**Typography:**
- Display: Poppins Bold (700)
- Headings: Poppins SemiBold (600)
- Body: Inter Regular (400)

**Components:**
- Glassmorphic cards with backdrop blur
- Gradient text and accents
- Smooth transitions and animations
- Responsive grid layout

## 📦 Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Vite** - Build tool
- **Wouter** - Client-side routing
- **Lucide React** - Icons
- **shadcn/ui** - UI components

## 🚀 Deployment

### GitHub Pages (Free)
```bash
# The GitHub Actions workflow will automatically deploy on push to main
# Your site will be available at: https://YOUR_USERNAME.github.io/data-engineer-roadmap
```

### Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect and deploy
4. Your site will be live instantly

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Set build command: `pnpm build`
4. Set publish directory: `dist`

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

## 📝 Customization

### Add New Learning Stage

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

### Modify Colors

Edit `client/src/index.css` and update the CSS variables in the `:root` section.

### Update Hero Image

Replace `/client/public/images/hero-banner.png` with your custom image.

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- All learning resources are from their respective creators on YouTube
- Design inspired by modern minimalist web design principles
- Built with React and Tailwind CSS

## 📞 Support

For questions or issues:
1. Check the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment help
2. Open an issue on GitHub
3. Check existing issues for solutions

## 🎓 Learning Resources

This roadmap compiles resources from various YouTube creators. All credit goes to the original content creators. Please support them by:
- Subscribing to their channels
- Liking and commenting on their videos
- Sharing their content

## 🔗 Quick Links

- [Live Demo](https://YOUR_LIVE_URL_HERE)
- [GitHub Repository](https://github.com/YOUR_USERNAME/data-engineer-roadmap)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)

---

**Happy Learning! 🚀**

Built with ❤️ for aspiring data engineers
