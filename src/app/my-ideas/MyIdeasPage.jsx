"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

import MyIdeaCard from "@/components/myIdeas/MyIdeaCard";

import EditIdeaModal from "@/components/myIdeas/EditIdeaModal";

import EmptyState from "@/components/myIdeas/EmptyState";

import MyIdeasHeader from "@/components/myIdeas/MyIdeasHeader";

const MyIdeasPage = () => {
  const { data: session } = authClient.useSession();

  const [ideas, setIdeas] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingIdea, setEditingIdea] = useState(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas`, {
          cache: "no-store",
        });

        const data = await res.json();

        const myIdeas = data.filter(
          (idea) => idea.userEmail === session?.user?.email,
        );

        setIdeas(myIdeas);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchIdeas();
    }
  }, [session]);

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Delete this idea?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ideas/${id}?email=${session.user.email}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        setIdeas(ideas.filter((idea) => idea._id !== id));

        toast.success("Idea deleted successfully");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // UPDATE
  const handleUpdateIdea = (updatedIdea) => {
    const updatedIdeas = ideas.map((idea) =>
      idea._id === updatedIdea._id ? updatedIdea : idea,
    );

    setIdeas(updatedIdeas);
  };

  return (
    <section className="min-h-screen bg-slate-50 py-24 transition-colors duration-300 dark:bg-[#020617]">
      <div className="mx-auto max-w-7xl px-6">
        <MyIdeasHeader />

        {loading ? (
          <div className="flex min-h-75 items-center justify-center">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600 dark:border-violet-900 dark:border-t-violet-400"></div>
          </div>
        ) : ideas.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {ideas.map((idea) => (
              <MyIdeaCard
                key={idea._id}
                idea={idea}
                onDelete={handleDelete}
                onEdit={setEditingIdea}
              />
            ))}
          </div>
        )}
      </div>

      {editingIdea && (
        <EditIdeaModal
          editingIdea={editingIdea}
          setEditingIdea={setEditingIdea}
          onUpdate={handleUpdateIdea}
        />
      )}
    </section>
  );
};

export default MyIdeasPage;
