import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

import NotePreview from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsModalPage({ params }: Props) {
  const { id } = await params;

  const qc = new QueryClient();

  await qc.prefetchQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}
