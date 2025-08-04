import React, { useEffect, useState } from "react";
import ThemeCard from "../../../Components/ThemeCard";
import HomePagePreview from "../../../Components/HomePagePreview";
import { ChevronsLeftRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createLazyRoute } from "@tanstack/react-router";

const THEMES = [
  "light",
  "dark",
  "cupcake",
  "synthwave",
  "retro",
  "lofi",
  "pastel",
  "black",
  "night",
  "dim",
  "sunset",
  "abyss",
];

const Theme = () => {
  const [selectedTheme, setSelectedTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setSelectedTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeChange = (newTheme) => {
    setSelectedTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="overflow-hidden px-4 py-8">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
        <div className="flex flex-col w-full lg:w-2/3">
          <h1 className="text-3xl font-semibold text-center mb-6">Themes</h1>
          <motion.div
            className="rounded-box grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {THEMES.map((theme, index) => (
              <motion.div
                key={theme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <ThemeCard themeName={theme} onClick={handleThemeChange} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="divider divider-horizontal my-10">
          <ChevronsLeftRight className="scale-200" />
        </div>
        <div className="hidden lg:flex flex-col items-center">
          <h2 className="text-3xl font-semibold text-center mb-4">Preview</h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <HomePagePreview />
          </motion.div>
        </div>

        <div className="lg:hidden mt-12 w-full">
          <h2 className="text-2xl font-semibold text-center mb-4">Preview</h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <HomePagePreview />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const Route = createLazyRoute("/setting/$username/$id/theme")({
  component:Theme
})

export default Theme;
