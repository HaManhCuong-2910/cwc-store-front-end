import { AxiosResponse } from 'axios';
import { instance } from '../axios';

export const getBannerHome = async () => {
  return [
    'https://jdsportsusablog.s3.amazonaws.com/wp-content/uploads/2023/01/Ja1-HeaderBanner-01.jpg',
    'https://e0.pxfuel.com/wallpapers/536/1007/desktop-wallpaper-basketball-shoes-sf-shoes-shop-banner-design-nike-basketball-shoes.jpg',
    'https://www.si.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_xy_center%2Cq_auto:good%2Cw_1200%2Cx_2357%2Cy_2273/MTk0ODgwMzM1NDQ2NTQ5NjY2/usatsi_19706694.jpg',
  ];
};
