"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

import {
  Lightbulb,
  ImageIcon,
  DollarSign,
  Tags,
  Layers,
  Users,
  Sparkles,
} from "lucide-react";

export default function AddIdeaPage() {
  const router = useRouter();

  // SESSION
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",

    shortDescription: "",

    detailedDescription: "",

    category: "",

    tags: "",

    imageURL: "",

    estimatedBudget: "",

    targetAudience: "",

    problemStatement: "",

    proposedSolution: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // LOGIN CHECK
    if (!session?.user) {
      toast.error("Please login first");

      router.push("/login");

      return;
    }

    setLoading(true);

    const newIdea = {
      title: formData.title,

      shortDescription: formData.shortDescription,

      detailedDescription: formData.detailedDescription,

      category: formData.category,

      tags: formData.tags.split(",").map((tag) => tag.trim()),

      imageURL: formData.imageURL,

      estimatedBudget: formData.estimatedBudget,

      targetAudience: formData.targetAudience,

      problemStatement: formData.problemStatement,

      proposedSolution: formData.proposedSolution,

      // AUTHOR INFO
      author: session.user.name,

      profile: session.user.image,

      userEmail: session.user.email,

      createdAt: new Date(),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newIdea),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Idea added successfully 🚀");

        setFormData({
          title: "",

          shortDescription: "",

          detailedDescription: "",

          category: "",

          tags: "",

          imageURL: "",

          estimatedBudget: "",

          targetAudience: "",

          problemStatement: "",

          proposedSolution: "",
        });

        router.push("/ideas");

        router.refresh();
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 py-24 transition-colors duration-300 dark:bg-[#020617]">
      <div className="mx-auto max-w-5xl px-6">
        {/* HEADER */}
        <div className="mb-14 text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-5 py-2 text-sm font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300">
            <Sparkles size={16} />
            Startup Submission
          </p>

          <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Submit Your Startup Idea
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500 dark:text-slate-400">
            Share your innovative startup concept with the community and inspire
            future creators.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-[40px] border border-slate-200 bg-white p-8 shadow-xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 md:p-12"
        >
          {/* TITLE */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Idea Title
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition-all focus-within:border-violet-300 focus-within:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus-within:bg-slate-900">
              <Lightbulb size={20} className="text-violet-600" />

              <input
                type="text"
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter startup idea title"
                className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* SHORT DESCRIPTION */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Short Description
            </label>

            <textarea
              rows={3}
              required
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Write short description..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-700 outline-none transition-all focus:border-violet-300 focus:bg-white placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900 dark:placeholder:text-slate-500"
            />
          </div>

          {/* DETAILED DESCRIPTION */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Detailed Description
            </label>

            <textarea
              rows={6}
              required
              name="detailedDescription"
              value={formData.detailedDescription}
              onChange={handleChange}
              placeholder="Write detailed startup idea..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-700 outline-none transition-all focus:border-violet-300 focus:bg-white placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900 dark:placeholder:text-slate-500"
            />
          </div>

          {/* GRID */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* CATEGORY */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Category
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition-all focus-within:border-violet-300 focus-within:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus-within:bg-slate-900">
                <Layers size={20} className="text-violet-600" />

                <select
                  required
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-transparent text-slate-700 outline-none dark:text-white"
                >
                  <option value="">Select Category</option>

                  <option>AI</option>

                  <option>Education</option>

                  <option>Health</option>

                  <option>Tech</option>
                </select>
              </div>
            </div>

            {/* TAGS */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Tags
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition-all focus-within:border-violet-300 focus-within:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus-within:bg-slate-900">
                <Tags size={20} className="text-violet-600" />

                <input
                  type="text"
                  required
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="AI, Startup, SaaS"
                  className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* IMAGE URL */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Image URL
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition-all focus-within:border-violet-300 focus-within:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus-within:bg-slate-900">
                <ImageIcon size={20} className="text-violet-600" />

                <input
                  type="url"
                  required
                  name="imageURL"
                  value={formData.imageURL}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* BUDGET */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Estimated Budget
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition-all focus-within:border-violet-300 focus-within:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus-within:bg-slate-900">
                <DollarSign size={20} className="text-violet-600" />

                <input
                  type="text"
                  required
                  name="estimatedBudget"
                  value={formData.estimatedBudget}
                  onChange={handleChange}
                  placeholder="$20,000"
                  className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* TARGET AUDIENCE */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Target Audience
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition-all focus-within:border-violet-300 focus-within:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus-within:bg-slate-900">
              <Users size={20} className="text-violet-600" />

              <input
                type="text"
                required
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                placeholder="Students"
                className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* PROBLEM */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Problem Statement
            </label>

            <textarea
              rows={4}
              required
              name="problemStatement"
              value={formData.problemStatement}
              onChange={handleChange}
              placeholder="Describe the problem..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-700 outline-none transition-all focus:border-violet-300 focus:bg-white placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900 dark:placeholder:text-slate-500"
            />
          </div>

          {/* SOLUTION */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Proposed Solution
            </label>

            <textarea
              rows={4}
              required
              name="proposedSolution"
              value={formData.proposedSolution}
              onChange={handleChange}
              placeholder="Describe your solution..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-700 outline-none transition-all focus:border-violet-300 focus:bg-white placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900 dark:placeholder:text-slate-500"
            />
          </div>

          {/* SUBMIT BTN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-linear-to-r from-violet-600 to-fuchsia-600 py-5 text-lg font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Submitting..." : "Submit Startup Idea 🚀"}
          </button>
        </form>
      </div>
    </section>
  );
}
