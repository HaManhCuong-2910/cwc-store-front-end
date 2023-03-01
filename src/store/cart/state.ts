import { TProduct } from '@/api/products/data';
export enum ETimeline {
  InformationLine = 'InformationLine',
  BuyerInformation = 'BuyerInformation',
  Order = 'Order',
}

export type TCartState = {
  cart: TProduct[];
  timeline_cart: ETimeline;
};

export const handleCartState: TCartState = {
  cart: sessionStorage.getItem('cart')
    ? JSON.parse(sessionStorage.getItem('cart') as string)
    : [],
  timeline_cart: ETimeline.InformationLine,
};
