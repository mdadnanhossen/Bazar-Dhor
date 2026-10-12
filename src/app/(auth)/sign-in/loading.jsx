
export default function SigninLoading() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f0f5f0] px-4 py-10">
      <div className="mb-3 h-8 w-32 animate-pulse rounded bg-[#dfe8df]" />
      <div className="mb-6 h-4 w-64 animate-pulse rounded bg-[#dfe8df]" />

      <div className="w-full max-w-[440px] animate-pulse space-y-4 rounded-xl border border-[#e0e9e0] bg-[#fbfcfb] p-6">
        {[1, 2].map((item) => (
          <div key={item} className="space-y-2">
            <div className="h-3 w-20 rounded bg-[#e0e8e0]" />
            <div className="h-10 rounded-lg bg-[#edf1ed]" />
          </div>
        ))}
        <div className="h-10 rounded-lg bg-[#dfe8df]" />
        <div className="h-px bg-[#e0e8e0]" />
        <div className="h-10 rounded-lg bg-[#edf1ed]" />
      </div>
    </main>
  );
}
