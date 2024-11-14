"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddNoticeForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Title and description are required");
      return;
    }

    setLoading(true);

    try {
      const response = axios.post("/api/notices/create", {
        title,
        description,
      });
      toast.promise(response, {
        loading: "Adding notice...",
        success: "Notice added successfully",
        error: "Error adding notice",
      });
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error("Error adding notice");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Add Notice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input input-bordered w-full mt-2"
            placeholder="Enter notice title"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="textarea textarea-bordered w-full mt-2"
            placeholder="Enter notice description"
            rows={5}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`btn btn-primary ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Notice"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNoticeForm;
