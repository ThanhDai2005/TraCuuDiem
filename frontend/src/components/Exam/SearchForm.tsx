import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SearchForm = ({ onSearch, loading }) => {
  const [sbd, setSbd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSearch(sbd);
  };

  const handleChange = (e) => {
    const onlyNumber = e.target.value.replace(/\D/g, "");
    setSbd(onlyNumber.slice(0, 4));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="sbd">Số báo danh</Label>
        <Input
          id="sbd"
          type="text"
          placeholder="Nhập SBD từ 001 đến 1000"
          value={sbd}
          onChange={handleChange}
          maxLength={4}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        <Search className="w-4 h-4 mr-2" />
        {loading ? "Đang tra cứu..." : "Tra cứu điểm"}
      </Button>
    </form>
  );
};

export default SearchForm;
