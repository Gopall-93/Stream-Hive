import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../../lib/features/updateProfile";
import { userLogin } from "../../../lib/features/Slice/userSlice";
import { motion } from "framer-motion";
import { createLazyRoute } from "@tanstack/react-router";

export const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [changesMade, setChangesMade] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    emailId: user.emailId,
    phonenumber: user.phonenumber,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setChangesMade(true);
  };

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      // await queryClient.refetchQueries({ queryKey: ["authUser"] });
      dispatch(userLogin(data.updatedUserDetails));
      setChangesMade(false);
    },
    onError: (err) => {
      console.error("Profile update failed:", err);
    },
  });

  const handleSubmit = () => {
    mutation.mutate(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md mx-auto p-10 mt-20 bg-base-200 rounded-2xl shadow-lg space-y-5"
    >
      <h2 className="text-2xl font-semibold text-center">Update Profile</h2>

      <div className="form-control">
        <label className="label mr-10">
          <span className="label-text font-medium">Name</span>
        </label>
        <input
          type="text"
          name="name"
          className="input input-bordered"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Email Address</span>
        </label>
        <input
          type="email"
          name="emailId"
          className="input input-bordered"
          value={formData.emailId}
          onChange={handleChange}
          placeholder="john@example.com"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Phone Number</span>
        </label>
        <input
          type="tel"
          name="phonenumber"
          className="input input-bordered"
          value={formData.phonenumber}
          onChange={handleChange}
          placeholder="+1 234 567 8901"
        />
      </div>

      {changesMade && (
        <p className="text-sm text-warning">
          Click on <strong className="text-error">Save Changes</strong> to apply
          your updates.
        </p>
      )}

      <button
        className="btn btn-primary w-full mt-4"
        type="button"
        onClick={handleSubmit}
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Saving..." : "Save Changes"}
      </button>
    </motion.form>
  );
};
export const Route = createLazyRoute("/setting/$username/$id/profile")({
  component:Profile
})