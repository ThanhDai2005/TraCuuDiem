import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ResultCard = ({ data, region }) => {
  const formatted = data?.NgaySinh
    ? new Date(data.NgaySinh).toLocaleDateString("vi-VN")
    : "N/A";

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Kết quả tra cứu</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3 text-sm">
        <div>
          <span className="font-semibold">Số báo danh:</span> {data.sbd}
        </div>
        <div>
          <span className="font-semibold">Họ tên:</span> {data.HoTen}
        </div>
        <div>
          <span className="font-semibold">Ngày sinh:</span> {formatted}
        </div>
        <div>
          <span className="font-semibold">Vùng miền:</span> {data.VungMien}
        </div>
        <div>
          <span className="font-semibold">Node xử lý:</span> {region}
        </div>
        <div>
          <span className="font-semibold">Điểm Toán:</span> {data.DiemToan}
        </div>
        <div>
          <span className="font-semibold">Điểm Văn:</span> {data.DiemVan}
        </div>
        <div>
          <span className="font-semibold">Điểm Anh:</span> {data.DiemAnh}
        </div>
        <div>
          <span className="font-semibold">Tổng điểm:</span> {data.TongDiem}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
