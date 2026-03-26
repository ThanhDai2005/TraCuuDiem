import dbNorth from "../../config/dbNorth.js";
import dbSouth from "../../config/dbSouth.js";

const REGION = {
  NORTH: "MIEN BAC",
  SOUTH: "MIEN NAM",
};

const normalizeSbd = (value) => {
  if (value === undefined || value === null) return null;

  const raw = String(value).trim();

  if (!/^\d+$/.test(raw)) return null;

  const numeric = Number(raw);

  if (!Number.isInteger(numeric) || numeric < 1 || numeric > 1000) {
    return null;
  }

  return String(numeric).padStart(3, "0");
};

const getRegionBySbd = (sbd) => {
  const numeric = Number(sbd);

  if (numeric >= 1 && numeric <= 500) {
    return REGION.NORTH;
  }

  if (numeric >= 501 && numeric <= 1000) {
    return REGION.SOUTH;
  }

  return null;
};

const getPoolByRegion = (region) => {
  if (region === REGION.NORTH) return dbNorth;
  if (region === REGION.SOUTH) return dbSouth;
  return null;
};

export const searchExamResult = async (req, res) => {
  try {
    const { sbd } = req.body;

    const normalizedSbd = normalizeSbd(sbd);

    if (!normalizedSbd) {
      return res.status(400).json({
        message: "Số báo danh không hợp lệ. Vui lòng nhập từ 001 đến 1000.",
      });
    }

    const region = getRegionBySbd(normalizedSbd);

    if (!region) {
      return res.status(400).json({
        message: "Không xác định được khu vực của số báo danh.",
      });
    }

    const pool = getPoolByRegion(region);

    if (!pool) {
      return res.status(500).json({
        message: "Không tìm thấy node dữ liệu phù hợp.",
      });
    }

    try {
      const [rows] = await pool.query(
        `
        SELECT
          sbd,
          HoTen,
          NgaySinh,
          VungMien,
          DiemToan,
          DiemVan,
          DiemAnh,
          TongDiem
        FROM candidates
        WHERE sbd = ?
        LIMIT 1
        `,
        [normalizedSbd],
      );

      if (!rows || rows.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy thí sinh với số báo danh này.",
          data: null,
        });
      }

      return res.status(200).json({
        message: "Tra cứu điểm thành công.",
        region,
        data: rows[0],
      });
    } catch (dbError) {
      console.error(`Lỗi node ${region}:`, dbError.message);

      return res.status(503).json({
        message: "Khu vực này đang bảo trì.",
        region,
        error: dbError.code || "DB_NODE_UNAVAILABLE",
      });
    }
  } catch (error) {
    console.error("Lỗi hệ thống:", error.message);

    return res.status(500).json({
      message: "Lỗi hệ thống nội bộ.",
    });
  }
};
