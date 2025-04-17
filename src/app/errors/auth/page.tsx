import { useSearchParams } from 'next/navigation'


export default function NotFoundPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <p className="mt-4 text-gray-500">ERROR: {error}</p>
        </div>
      </div>
    );
  }