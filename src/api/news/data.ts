export interface IGetListNewsResponse {
  data: DataGetListNewsResponse[];
  page: number;
  countRecord: number;
  count: number;
}

export interface DataGetListNewsResponse {
  _id: string;
  author: string;
  img: string;
  title: string;
  short_description: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
