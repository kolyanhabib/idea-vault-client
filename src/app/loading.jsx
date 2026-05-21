export default function Loading() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#020617]">
      <div className="relative">
        {/* OUTER RING */}
        <div className="h-32 w-32 animate-spin rounded-full border-4 border-violet-500/20 border-t-violet-500" />

        {/* INNER RING */}
        <div className="absolute inset-4 animate-spin rounded-full border-4 border-cyan-500/20 border-b-cyan-500" />

        {/* CENTER */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 shadow-[0_0_25px_rgba(139,92,246,.45)]" />
        </div>
      </div>
    </section>
  );
}
