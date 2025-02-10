"use client";

import { useGetBooks } from "@/modules/books/api/use-get-books";

export default function Home() {
  const {data} = useGetBooks();

  return (
    <main>
      {data}
    </main>
  )
}