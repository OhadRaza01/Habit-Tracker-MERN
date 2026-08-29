export default function LoadingScreen() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-white">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#eee7db] border-t-[#ff5a36]" />
      <p className="text-sm font-medium text-[#8a8a8a]">Loading...</p>
    </div>
  );
}