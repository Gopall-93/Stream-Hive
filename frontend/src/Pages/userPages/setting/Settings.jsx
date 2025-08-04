import React, { useEffect } from "react";
import { SettingsLayout } from "../../../Components/SettingsLayout";
import { SettingCard } from "../../../Components/SettingCard";
import { useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { createLazyRoute } from "@tanstack/react-router";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
    },
  }),
};

const Settings = () => {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate({ to: "/" });
  }, [isLoggedIn, navigate]);

  const cards = [
    {
      title: "Your-Channel",
      description: "View your channel and it's analytics",
    },
    {
      title: "Profile",
      description: "Update your name and personal info.",
    },
    {
      title: "Password",
      description: "Change your password securely.",
    },
    {
      title: "Theme",
      description: "Choose light, dark or system mode.",
    },
    {
      title: "About",
      description: "Learn more about Stream Hive.",
    },
  ];

  return (
    <SettingsLayout
      name={user?.name?.toUpperCase() || ""}
      avatarUrl={user?.avatar || ""}
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <SettingCard
          id={user._id}
            username={user.username}
            title={card.title}
            description={card.description}
          ></SettingCard>
        </motion.div>
      ))}
    </SettingsLayout>
  );
};

export const Route = createLazyRoute("/setting/$id")({
  component:Settings
})

export default Settings;
