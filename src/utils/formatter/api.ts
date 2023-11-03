import Model from "sequelize/types/model";

interface DataType {
  rows: Model<any, any>[];
  count: number;
}

export const getPagination = (page: number, size: number) => {
  const limit = size || 10;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};

export const getPagingData = (data: DataType, page: number, limit: number) => {
  const { count: totalItems, rows: datas } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, datas, totalPages, currentPage };
};
