"use client";

import { useGetBooks } from "@/modules/books/api/use-get-books";

export default function Home() {
  const {data, isLoading, isError} = useGetBooks();

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <main>
      {data}
    </main>
  )
}