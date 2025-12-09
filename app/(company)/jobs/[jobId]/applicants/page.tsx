export default function ApplicantsPage({
  params,
}: {
  params: { jobId: string };
}) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">지원자 관리</h1>
      <p className="text-gray-600">
        채용 공고 ID: {params.jobId}에 지원한 지원자 목록을 관리하는 페이지입니다.
      </p>
    </div>
  );
}
