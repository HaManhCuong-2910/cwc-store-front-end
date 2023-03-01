export interface TOrderCart {
  name: string;
  email: string;
  phoneNumber: string;
  province: string | number;
  district: string | number;
  address: string;
  data: Datum[];
}

export interface Datum {
  id: string;
  name: string;
  size: number;
  size_id: string;
  quantity: number;
}
