export default function JobDetailPage({
  params,
}: {
  params: { jobId: string };
}) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">채용 공고 상세</h1>
      <p className="text-gray-600">
        채용 공고 ID: {params.jobId}의 상세 정보를 확인하고 지원하는 페이지입니다.
      </p>
    </div>
  );
}
