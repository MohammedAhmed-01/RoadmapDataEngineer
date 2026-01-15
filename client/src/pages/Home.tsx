import { useState, useEffect } from 'react';
import { ArrowDown, Zap, BarChart3 } from 'lucide-react';
import { useLocation } from 'wouter';
import RoadmapCard from '@/components/RoadmapCard';
import ProgressStats from '@/components/ProgressStats';
import { roadmapData } from '@/lib/roadmapData';
import { useProgressTracker } from '@/hooks/useProgressTracker';

/**
 * Home Page - Data Engineering Roadmap
 * Design System: Modern Minimalist with Gradient Accents
 * - Navy background (#1a2332) with teal gradients (#06b6d4 → #0891b2)
 * - Poppins for headings, Inter for body text
 * - Vertical timeline layout with glassmorphic cards
 * - Smooth hover effects and scroll-triggered animations
 * - Progress tracking with checkboxes and localStorage persistence
 */

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleResource, isResourceCompleted, getStageProgress, getTotalProgress, clearAllProgress, isLoaded } =
    useProgressTracker();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate total progress metrics
  const resourcesPerStage: Record<number, number> = {};
  roadmapData.forEach((stage) => {
    resourcesPerStage[stage.id] = stage.resources.length;
  });

  const totalResources = roadmapData.reduce((sum, stage) => sum + stage.resources.length, 0);
  const totalProgress = getTotalProgress(roadmapData.length, resourcesPerStage);

  // Count completed resources
  let completedCount = 0;
  roadmapData.forEach((stage) => {
    stage.resources.forEach((resource) => {
      if (isResourceCompleted(stage.id, resource.id)) {
        completedCount++;
      }
    });
  });

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-banner.png"
            alt="Hero Banner"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background"></div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-label border border-cyan-500/30">
              ✨ Your Learning Journey Starts Here
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Data Engineering
            <span className="gradient-text"> Roadmap</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            A comprehensive, structured learning path for beginners to master data engineering from fundamentals to
            cloud deployment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => {
                const roadmapSection = document.getElementById('roadmap');
                roadmapSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold rounded-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-smooth hover:scale-105"
            >
              <Zap className="inline mr-2" size={20} />
              Start Learning
            </button>
            <a
              href="/dashboard"
              className="px-8 py-4 border border-cyan-500/50 text-cyan-300 font-semibold rounded-lg hover:bg-cyan-500/10 transition-smooth flex items-center justify-center gap-2"
            >
              <BarChart3 size={20} />
              View Dashboard
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="text-cyan-400" size={24} />
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 bg-gradient-to-b from-background to-slate-900/50">
        <div className="container mx-auto px-4">
          {/* Section header */}
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              Your Learning
              <span className="gradient-text"> Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow this structured roadmap to build a strong foundation in data engineering. Each stage builds upon
              the previous one, ensuring a comprehensive learning experience. Check off resources as you complete them
              to track your progress!
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            {roadmapData.map((stage, index) => (
              <RoadmapCard
                key={stage.id}
                stage={stage}
                index={index}
                onResourceToggle={(resourceId) => toggleResource(stage.id, resourceId)}
                isResourceCompleted={(resourceId) => isResourceCompleted(stage.id, resourceId)}
                stageProgress={getStageProgress(stage.id, stage.resources.length)}
              />
            ))}
          </div>

          {/* Completion message */}
          <div className="mt-20 text-center">
            <div className="inline-block p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg">
              <h3 className="font-heading text-2xl mb-3">🎉 Congratulations!</h3>
              <p className="text-muted-foreground">
                You've completed the Data Engineering roadmap. You're now ready to tackle real-world data engineering
                challenges!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">Built with 💙 for aspiring data engineers</p>
          <p className="text-sm text-muted-foreground/70">
            © 2024 Data Engineering Roadmap. All resources are from their respective creators.
          </p>
        </div>
      </footer>

      {/* Progress Stats - Fixed Position */}
      <ProgressStats
        totalProgress={totalProgress}
        completedCount={completedCount}
        totalCount={totalResources}
        onClearProgress={clearAllProgress}
      />
    </div>
  );
}
