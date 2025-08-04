import React from "react";
import { useNavigate } from "@tanstack/react-router";

const SettingRoutes = ["Profile", "Password", "Theme", "About", "Your-Channel"];

export const SettingCard = ({ title, description, id,username }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const redirectTo = title;

    SettingRoutes.map((route) => {
      if (route == redirectTo) {
        navigate({ to: `/setting/${username}/${id}/${redirectTo.toLowerCase()}` });
        return;
      }
    });
  };

  return (
    <div
      onClick={handleClick}
      className="card bg-base-100 shadow-md hover:shadow-lg hover:shadow-base-300/50 cursor-pointer transition-all"
    >
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};
