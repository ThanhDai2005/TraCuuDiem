import { useState } from "react";
import SearchForm from "@/components/Exam/SearchForm";
import ResultCard from "@/components/Exam/ResultCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { searchExamResult } from "@/services/examService";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [region, setRegion] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async (sbd: string) => {
    setLoading(true);
    setError("");
    setResult(null);
    setRegion("");

    try {
      const res = await searchExamResult(sbd);

      if (res.data) {
        setResult(res.data);
        setRegion(res.region || "");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-10 bg-zinc-50">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Hệ thống Tra cứu Điểm thi Quốc gia
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Kiến trúc CSDL phân tán với 2 node Bắc - Nam, định tuyến theo số báo
            danh
          </p>
        </div>

        <div className="p-6 bg-white border shadow-sm rounded-2xl">
          <SearchForm onSearch={handleSearch} loading={loading} />

          {error && (
            <Alert variant="destructive" className="mt-6">
              <AlertTitle>Thông báo</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && <ResultCard data={result} region={region} />}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
