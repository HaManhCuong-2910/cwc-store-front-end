import { AxiosResponse } from 'axios';
import { instance } from '../axios';

export const getBannerHome = async () => {
  return [
    'https://jdsportsusablog.s3.amazonaws.com/wp-content/uploads/2023/01/Ja1-HeaderBanner-01.jpg',
    'https://myshoes.vn/image/cache/catalog/2022/banner/cata/giay-nike-nu-chinh-hang-600x315h.png',
    'https://intphcm.com/data/upload/poster-giay-ad.jpg',
  ];
};
