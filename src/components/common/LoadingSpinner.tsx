export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-purple-100 border-t-[#7D2D76] animate-spin" />
        <div className="mt-4 text-center text-sm text-gray-500 font-medium">Loading...</div>
      </div>
    </div>
  )
}
