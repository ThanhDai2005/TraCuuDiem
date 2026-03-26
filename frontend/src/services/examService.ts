import api from "@/lib/axios";

export interface IExamResult {
  sbd: string;
  HoTen: string;
  NgaySinh: string;
  VungMien: string;
  DiemToan: number;
  DiemVan: number;
  DiemAnh: number;
  TongDiem: number;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  region?: string;
  data: T;
  error?: string;
}

export const searchExamResult = async (sbd: string) => {
  const res = await api.post("/exams/search", { sbd });

  return res.data;
};
