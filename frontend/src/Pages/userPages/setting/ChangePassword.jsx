import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../../lib/features/updatePassword";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { createLazyRoute } from "@tanstack/react-router";

export const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState(false);

  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Password updated successfully🎉")
    },
    onError:(error)=>{
      toast.error(error.response.data.message)
    }
  });

  const handleClick = () => {
    for (const key in formData) {
      if (formData[key] === "") {
        setError(true);
        return;
      }
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError(true);
      return;
    }

    setError(false);
    mutation.mutate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleShow = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

const renderInput = (label, name, typeKey) => (
  <div className="form-control relative">
    <label className="label">
      <span className="label-text font-medium mb-2">{label}</span>
    </label>

    <div className="relative">
      <input
        value={formData[name]}
        type={showPassword[typeKey] ? "text" : "password"}
        name={name}
        className="input input-bordered w-full pr-12" // Give space for icon
        placeholder={`Enter ${label.toLowerCase()}`}
        onChange={handleChange}
      />

      {/* Animated Icon (overlapping input) */}
      <motion.button
        type="button"
        onClick={() => toggleShow(typeKey)}
        className="absolute right-3 top-1/2 z-1 -translate-y-1/2 text-gray-500 hover:text-primary"
        initial={false}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.85 }}
      >
        <AnimatePresence mode="wait">
          {showPassword[typeKey] ? (
            <motion.div
              key="eyeOff"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <EyeOff size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="eye"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Eye size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>

    {/* Field-specific errors */}
    <AnimatePresence>
      {formData[name] === "" && error && (
        <motion.p
          className="text-error text-sm mt-1"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          *{label} is required
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);
;

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md mx-auto p-10 mt-20 bg-base-200 rounded-2xl shadow-xl space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center">Change Password</h2>

      {renderInput("Current Password", "currentPassword", "current")}
      {renderInput("New Password", "newPassword", "new")}
      {renderInput("Confirm New Password", "confirmPassword", "confirm")}

      {/* Password mismatch */}
      <AnimatePresence>
        {error &&
          formData.newPassword !== "" &&
          formData.confirmPassword !== "" &&
          formData.newPassword !== formData.confirmPassword && (
            <motion.p
              className="text-error text-sm text-center"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              *New password must match Confirm password
            </motion.p>
          )}
      </AnimatePresence>

      <button
        className="btn btn-primary w-full mt-4"
        type="button"
        onClick={handleClick}
      >
        Change Password
      </button>
    </motion.form>
  );
};

export const Route = createLazyRoute("/setting/$username/$id/password")({
  component:ChangePassword
})