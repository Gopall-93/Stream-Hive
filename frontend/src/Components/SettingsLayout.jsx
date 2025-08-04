import React from "react";

export const SettingsLayout = ({ avatarUrl, name, children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-base-200 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-8">
        {/* Avatar */}
        <div className="avatar self-start sm:self-auto">
          <div className="w-20 sm:w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={avatarUrl} alt="User Avatar" />
          </div>
        </div>

        {/* Greeting */}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-base-content">
            Welcome back, <span className="text-primary">{name}</span>!
          </h1>
          <p className="text-sm text-base-content/60">
            Manage your settings below
          </p>
        </div>
      </div>

      {/* Children / Setting Cards */}
      <div className="grid gap-4">{children}</div>

      {/* Footer */}
      <footer className="mt-10 text-center text-sm text-base-content/50">
        <p>
          &copy; Stream Hive. All rights reserved.
          <br />
          From 2023 to {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};
