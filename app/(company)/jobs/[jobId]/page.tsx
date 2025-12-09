export default function JobEditPage({
  params,
}: {
  params: { jobId: string };
}) {
  const isNew = params.jobId === "new";

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">
        {isNew ? "채용 공고 등록" : "채용 공고 수정"}
      </h1>
      <p className="text-gray-600">
        {isNew
          ? "새로운 채용 공고를 등록하는 페이지입니다."
          : `채용 공고 ID: ${params.jobId}를 수정하는 페이지입니다.`}
      </p>
    </div>
  );
}
