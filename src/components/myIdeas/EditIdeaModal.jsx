"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import {
  X,
  Sparkles,
  Save,
  FileText,
  Layers,
  Tags,
  ImageIcon,
  DollarSign,
  Users,
  Target,
  Lightbulb,
} from "lucide-react";

const EditIdeaModal = ({ editingIdea, setEditingIdea, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: editingIdea.title || "",

    shortDescription: editingIdea.shortDescription || "",

    detailedDescription: editingIdea.detailedDescription || "",

    category: editingIdea.category || "",

    tags: editingIdea.tags?.join(", ") || "",

    imageURL: editingIdea.imageURL || "",

    estimatedBudget: editingIdea.estimatedBudget || "",

    targetAudience: editingIdea.targetAudience || "",

    problemStatement: editingIdea.problemStatement || "",

    proposedSolution: editingIdea.proposedSolution || "",

    userEmail: editingIdea.userEmail,
  });

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const updatedIdea = {
      ...formData,

      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ideas/${editingIdea._id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(updatedIdea),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        const finalIdea = {
          ...editingIdea,

          ...updatedIdea,
        };

        onUpdate(finalIdea);

        toast.success("Idea updated successfully 🚀");

        setEditingIdea(null);
      } else {
        toast.error("No changes made");
      }
    } catch (error) {
      console.log(error);

      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      {/* MODAL */}
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[36px] bg-white shadow-2xl">
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-8 py-6">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-violet-700">
              <Sparkles size={14} />
              Edit Startup Idea
            </div>

            <h2 className="text-3xl font-black text-slate-900">
              Update Your Idea
            </h2>
          </div>

          <button
            onClick={() => setEditingIdea(null)}
            className="rounded-2xl bg-slate-100 p-3 transition hover:bg-slate-200"
          >
            <X size={22} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-7 p-8">
          {/* TITLE */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Idea Title
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition focus-within:border-violet-400 focus-within:bg-white">
              <Lightbulb size={20} className="text-violet-600" />

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Startup title"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* SHORT DESCRIPTION */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Short Description
            </label>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition focus-within:border-violet-400 focus-within:bg-white">
              <div className="mb-3 flex items-center gap-2 text-violet-600">
                <FileText size={18} />

                <span className="text-sm font-semibold">Description</span>
              </div>

              <textarea
                rows={4}
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Write short description..."
                className="w-full resize-none bg-transparent outline-none"
              />
            </div>
          </div>

          {/* DETAILED DESCRIPTION */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Detailed Description
            </label>

            <textarea
              rows={6}
              name="detailedDescription"
              value={formData.detailedDescription}
              onChange={handleChange}
              placeholder="Detailed startup explanation..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 outline-none transition focus:border-violet-400 focus:bg-white"
            />
          </div>

          {/* GRID */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* CATEGORY */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Category
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                <Layers size={20} className="text-violet-600" />

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* TAGS */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Tags
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                <Tags size={20} className="text-violet-600" />

                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="AI, SaaS"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* IMAGE URL */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Image URL
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                <ImageIcon size={20} className="text-violet-600" />

                <input
                  type="text"
                  name="imageURL"
                  value={formData.imageURL}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* BUDGET */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Estimated Budget
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                <DollarSign size={20} className="text-violet-600" />

                <input
                  type="text"
                  name="estimatedBudget"
                  value={formData.estimatedBudget}
                  onChange={handleChange}
                  placeholder="$5000"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {/* TARGET */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Target Audience
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <Users size={20} className="text-violet-600" />

              <input
                type="text"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                placeholder="Students, Developers..."
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* PROBLEM */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Problem Statement
            </label>

            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <Target size={20} className="mt-1 text-violet-600" />

              <textarea
                rows={4}
                name="problemStatement"
                value={formData.problemStatement}
                onChange={handleChange}
                placeholder="Describe the problem..."
                className="w-full resize-none bg-transparent outline-none"
              />
            </div>
          </div>

          {/* SOLUTION */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Proposed Solution
            </label>

            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <Sparkles size={20} className="mt-1 text-violet-600" />

              <textarea
                rows={4}
                name="proposedSolution"
                value={formData.proposedSolution}
                onChange={handleChange}
                placeholder="Describe your solution..."
                className="w-full resize-none bg-transparent outline-none"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-violet-600 to-fuchsia-600 py-5 text-lg font-semibold text-white shadow-lg shadow-violet-200 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Save size={20} />

            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditIdeaModal;
