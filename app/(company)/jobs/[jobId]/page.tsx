import BackButton from "@/components/buttons/BackButton";

export default async function JobEditPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const isNew = jobId === "new";

  return (
    <div className="container mx-auto py-8">
      <BackButton />
    </div>
  );
}
