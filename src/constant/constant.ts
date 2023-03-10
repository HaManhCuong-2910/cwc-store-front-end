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

export interface User {
  status: string;
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  age: number;
  roles: string[];
  type: string;
  avatar: any;
}

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
  slug: string;
  maxQuantity: number;
  size: number;
  size_id: string;
};

export interface TDataLocation {
  link: string;
  value: string;
}

export const validatePhoneNumber = (
  rule: any,
  value: any,
  callback: any
) => {
  const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  if (value === '') {
    callback(new Error('Vui lòng nhập số điện thoại'));
  }
  if (!regex.test(value)) {
    callback(
      new Error('Số điện thoại không đúng định dạng')
    );
  }
  callback();
};
