export type TItems = {
  text: string;
  href?: string;
  active?: boolean;
};

export type TDataCardNews = {
  id: number | string;
  author: string;
  img: string;
  title: string;
  timestamp: string;
  short_description: string;
  description: string;
};

export const formatNumberMony = (
  value: number | string
) => {
  let valueNumber = value;
  if (typeof value !== 'string') {
    valueNumber = Number(value);
  }
  const formater = new Intl.NumberFormat('vi-VN');
  return formater
    .format(valueNumber as number)
    .split(',')[0];
};
export type TProductCart = {
  id: string;
  name: string;
  quantity: number;
  image: string;
  price: number;
  maxQuantity: number;
  size: number;
  size_id: string;
};
