import { createLazyRoute } from "@tanstack/react-router";
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-4 py-12 text-base-content"
    >
      <h1 className="text-4xl font-bold text-center mb-8">
        🚀 About StreamHive
      </h1>

      <section className="space-y-6">
        <p>
          Welcome to <strong>StreamHive</strong> — the next-generation,
          AI-powered video streaming platform built to deliver lightning-fast
          content, powerful creator tools, and a personalized viewer experience
          like never before.
        </p>

        <h2 className="text-2xl font-semibold">🌟 Our Mission</h2>
        <p>
          To empower creators and delight audiences through innovation,
          performance, and a user-first design. StreamHive blends the beauty of
          UI/UX, the power of modern web tech, and the magic of AI.
        </p>

        <h2 className="text-2xl font-semibold">🧠 What Powers StreamHive?</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>React</strong> – Fast, modular, component-driven UI
          </li>
          <li>
            <strong>Tailwind CSS + DaisyUI</strong> – Utility-first and
            theme-rich styling
          </li>
          <li>
            <strong>Framer Motion</strong> – Sleek, animated transitions
          </li>
          <li>
            <strong>Lucide Icons</strong> – Clean, developer-friendly icons
          </li>
          <li>
            <strong>TanStack Router</strong> – Modern nested routing system
          </li>
          <li>
            <strong>TanStack Query</strong> – Real-time data fetching and
            caching
          </li>
          <li>
            <strong>Redux Toolkit</strong> – Scalable state management
          </li>
          <li>
            <strong>JWT Auth</strong> – Secure login via token-based
            authentication
          </li>
          <li>
            <strong>React Hook Form + Zod</strong> – Smooth forms with
            validation
          </li>
          <li>
            <strong>Theme Switcher</strong> – Dynamic theme selection with
            preview
          </li>
        </ul>

        <h2 className="text-2xl font-semibold">📱 Fully Responsive</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Mobile-first layout</li>
          <li>Dark/light mode with animated fade</li>
          <li>Accessible and keyboard-navigable</li>
        </ul>

        <h2 className="text-2xl font-semibold">🛠 Features You’ll Love</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Search and filter videos instantly</li>
          <li>Watch Later, Liked Videos, Subscriptions</li>
          <li>Upload your own content (coming soon!)</li>
          <li>Floating Sidebar + Navbar with smart behavior</li>
        </ul>

        <h2 className="text-2xl font-semibold">🔮 The Future</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Analytics for creators</li>
          <li>AI video summarization, chapters, thumbnails</li>
          <li>Smart feed powered by machine learning</li>
          <li>Role-based dashboards: Admin, Creator, Viewer</li>
        </ul>

        <div className="mt-8 border-l-4 border-primary pl-4 italic text-lg">
          🎉 Built with love, curiosity, and sleepless nights. StreamHive is
          more than a platform — it’s a movement.
        </div>
      </section>
    </motion.div>
  );
};


export const Route = createLazyRoute("/setting/$username/$id/about")({
  component: About,
});

export default About;
