export default function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/90 dark:bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-xl w-full max-w-md text-black dark:text-white border border-white/20">
      {children}
    </div>
  );
}
