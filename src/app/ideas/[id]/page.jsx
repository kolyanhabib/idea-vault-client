"use client";

import { useCallback, useEffect, useState } from "react";

import { useParams } from "next/navigation";

import Image from "next/image";

import toast from "react-hot-toast";

import {
  MessageCircle,
  Send,
  Trash2,
  Pencil,
  CalendarDays,
  Check,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function IdeaDetailsPage() {
  const params = useParams();

  const id = params.id;

  const [idea, setIdea] = useState(null);

  const [loading, setLoading] = useState(true);

  const [commentLoading, setCommentLoading] = useState(false);

  const [commentText, setCommentText] = useState("");

  const [comments, setComments] = useState([]);

  const [session, setSession] = useState(null);

  const [editingId, setEditingId] = useState(null);

  // FETCH IDEA
  const fetchIdea = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas/${id}`);

      const data = await res.json();

      setIdea(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // FETCH COMMENTS
  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`,
      );

      const data = await res.json();

      setComments(data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  // EFFECT
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchIdea(), fetchComments()]);

      const data = await authClient.getSession();

      setSession(data?.data);
    };

    loadData();
  }, [fetchIdea, fetchComments]);

  // ADD COMMENT
  const handleComment = async () => {
    if (!commentText) {
      return toast.error("Write something...");
    }

    setCommentLoading(true);

    try {
      const commentData = {
        ideaId: id,

        userName: session?.user?.name,

        userEmail: session?.user?.email,

        userImage: session?.user?.image,

        text: commentText,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
        method: "POST",

        headers: {
          "content-type": "application/json",
        },

        body: JSON.stringify(commentData),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Comment added");

        setComments([
          {
            ...commentData,

            _id: data.insertedId,

            createdAt: new Date(),
          },

          ...comments,
        ]);

        setCommentText("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCommentLoading(false);
    }
  };

  // DELETE COMMENT
  const handleDelete = async (commentId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Comment deleted");

        const remaining = comments.filter(
          (comment) => comment._id !== commentId,
        );

        setComments(remaining);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // START EDIT
  const handleEdit = (comment) => {
    setEditingId(comment._id);

    setCommentText(comment.text);
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditingId(null);

    setCommentText("");
  };

  // UPDATE COMMENT
  const handleUpdate = async () => {
    if (!commentText) {
      return toast.error("Write something...");
    }

    setCommentLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${editingId}`,
        {
          method: "PATCH",

          headers: {
            "content-type": "application/json",
          },

          body: JSON.stringify({
            text: commentText,
          }),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Comment updated");

        const updatedComments = comments.map((comment) => {
          if (comment._id === editingId) {
            return {
              ...comment,

              text: commentText,
            };
          }

          return comment;
        });

        setComments(updatedComments);

        setEditingId(null);

        setCommentText("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCommentLoading(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#020617]">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600 dark:border-violet-900 dark:border-t-violet-400"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-10 transition-colors duration-300 dark:bg-[#020617]">
      <div className="mx-auto max-w-4xl px-5">
        {/* MAIN CARD */}
        <div className="overflow-hidden rounded-[40px] border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
          <div className="p-5 md:p-8">
            {/* IMAGE */}
            <Image
              src={idea.imageURL}
              alt={idea.title}
              width={1400}
              height={700}
              sizes="(max-width: 768px) 100vw, 1200px"
              className="h-60 w-full rounded-3xl object-cover md:h-105"
            />

            {/* CATEGORY */}
            <div className="mt-6">
              <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">
                {idea.category}
              </span>
            </div>

            {/* TITLE */}
            <h1 className="mt-5 text-3xl font-black leading-tight text-slate-900 dark:text-white md:text-5xl">
              {idea.title}
            </h1>

            {/* AUTHOR */}
            <div className="mt-6 flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-violet-100 dark:ring-violet-900">
                <Image
                  src={idea.profile || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt={idea.author || "Author"}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {idea.author}
                </h3>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <CalendarDays size={15} />

                  {new Date(idea.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",

                    month: "long",

                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-8 text-[16px] leading-9 text-slate-600 dark:text-slate-300">
              {idea.detailedDescription}
            </p>

            {/* TAGS */}
            <div className="mt-7 flex flex-wrap gap-3">
              {idea.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="my-8 h-px w-full bg-slate-200 dark:bg-slate-800" />

            {/* INFO GRID */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Target Audience
                </h3>

                <p className="text-xl font-semibold text-slate-900 dark:text-white">
                  {idea.targetAudience}
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Budget
                </h3>

                <p className="text-xl font-semibold text-slate-900 dark:text-white">
                  {idea.estimatedBudget}
                </p>
              </div>
            </div>

            {/* PROBLEM */}
            <div className="mt-10">
              <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
                Problem Statement
              </h3>

              <p className="leading-8 text-slate-700 dark:text-slate-300">
                {idea.problemStatement}
              </p>
            </div>

            {/* SOLUTION */}
            <div className="mt-8">
              <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
                Proposed Solution
              </h3>

              <p className="leading-8 text-slate-700 dark:text-slate-300">
                {idea.proposedSolution}
              </p>
            </div>
          </div>
        </div>

        {/* COMMENTS */}
        <div className="mt-10 rounded-4xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Comments ({comments.length})
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                People shared their thoughts
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-950/40">
              <MessageCircle
                size={26}
                className="text-violet-700 dark:text-violet-400"
              />
            </div>
          </div>

          {/* COMMENT BOX */}
          <div className="mt-8 rounded-[30px] border border-slate-200 bg-linear-to-br from-violet-50 via-white to-fuchsia-50 p-5 dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 md:p-6">
            {/* USER */}
            <div className="mb-5 flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-violet-200 dark:ring-violet-900">
                <Image
                  src={
                    session?.user?.image ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt={session?.user?.name || "User"}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  {session?.user?.name || "Guest User"}
                </h4>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Share your thoughts
                </p>
              </div>
            </div>

            {/* TEXTAREA */}
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={5}
              placeholder="Write your comment here..."
              className="w-full resize-none rounded-3xl border border-slate-200 bg-white p-5 text-[15px] leading-7 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-violet-900"
            />

            {/* ACTIONS */}
            <div className="mt-5 flex items-center justify-between">
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Be respectful and constructive.
              </p>

              <div className="flex items-center gap-3">
                {editingId && (
                  <button
                    onClick={cancelEdit}
                    className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
                  >
                    Cancel
                  </button>
                )}

                <button
                  disabled={commentLoading}
                  onClick={editingId ? handleUpdate : handleComment}
                  className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition-all duration-300 hover:scale-[1.02]"
                >
                  {editingId ? (
                    <>
                      <Check size={18} />

                      {commentLoading ? "Updating..." : "Update Comment"}
                    </>
                  ) : (
                    <>
                      <Send size={18} />

                      {commentLoading ? "Posting..." : "Post Comment"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* COMMENTS LIST */}
          <div className="mt-8 space-y-5">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-white hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-900"
              >
                <div className="flex gap-4">
                  {/* PROFILE */}
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-violet-100 dark:ring-violet-900">
                    <Image
                      src={
                        comment.userImage ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt={comment.userName || "user"}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[17px] font-bold text-slate-900 dark:text-white">
                          {comment.userName}
                        </h3>

                        <div className="mt-1 flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500">
                          <CalendarDays size={14} />

                          {new Date(comment.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",

                              month: "long",

                              day: "numeric",
                            },
                          )}
                        </div>
                      </div>

                      {/* ACTIONS */}
                      {session?.user?.email === comment.userEmail && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(comment)}
                            className="rounded-xl bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200 dark:bg-blue-950/40 dark:text-blue-400"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(comment._id)}
                            className="rounded-xl bg-red-100 p-2 text-red-600 transition hover:bg-red-200 dark:bg-red-950/40 dark:text-red-400"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* COMMENT TEXT */}
                    <div className="mt-4 rounded-2xl bg-white p-4 dark:bg-slate-900">
                      <p className="leading-8 text-slate-700 dark:text-slate-300">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
