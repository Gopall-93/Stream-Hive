import {
  Home,
  Clock,
  Video,
  TvMinimalPlay,
  ThumbsUp,
  Users,
  FolderOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Link } from "@tanstack/react-router";

export function Sidebar({ isOpen, setIsOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-17 left-4 z-50 w-64 max-h-[90vh] overflow-y-auto bg-base-100 rounded-xl shadow-xl backdrop-blur-sm border border-base-300
    sm:static sm:max-h-screen sm:h-auto sm:top-0 sm:left-0 sm:rounded-xl sm:shadow-lg"
        >
          <div className="p-4 border-b font-bold text-xl flex justify-between items-center">
            Menu
            <button onClick={() => setIsOpen(false)} className="sm:hidden">
              ✕
            </button>
          </div>

          <ul className="p-4 space-y-3">
            <Link to="/">
              <li className="flex items-center gap-3 p-2 rounded hover:bg-base-200 transition">
                <Home size={20} />
                Home
              </li>
            </Link>

            <Link to="/subscription">
              <li className="flex items-center gap-3 p-2 rounded hover:bg-base-200 transition">
                <Users size={20} />
                Subscriptions
              </li>
            </Link>
          </ul>

          <hr className="my-2" />
          <div className="px-4 text-sm font-semibold">You</div>
          <ul className="p-4 pt-2 space-y-3">
            <li className="flex items-center gap-3 p-2 rounded hover:bg-base-200 transition">
              <TvMinimalPlay size={20} />
              Your Channel
            </li>
            <li className="flex items-center gap-3 p-2 rounded hover:bg-base-200 transition">
              <Clock size={20} />
              History
            </li>
            <li className="flex items-center gap-3 p-2 rounded hover:bg-base-200 transition">
              <FolderOpen size={20} />
              Playlists
            </li>
            <li className="flex items-center gap-3 p-2 rounded hover:bg-base-200 transition">
              <Video size={20} />
              Your Videos
            </li>
            <li className="flex items-center gap-3 p-2 rounded hover:bg-base-200 transition">
              <ThumbsUp size={20} />
              Liked Videos
            </li>
          </ul>

          <hr className="my-2" />
          <div className="px-4 text-sm font-semibold">Subscriptions</div>
          <ul className="p-4 pt-2 space-y-3">
            <li className="p-2 rounded hover:bg-base-200 transition">
              Fireship
            </li>
            <li className="p-2 rounded hover:bg-base-200 transition">
              Traversy Media
            </li>
            <li className="p-2 rounded hover:bg-base-200 transition">
              ThePrimeagen
            </li>
          </ul>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
