<template>
  <div>
    <div ref="paypal"></div>
  </div>
</template>

<script>
import { watch } from 'vue';
import { convertVietNamMoneyToUSD } from '@/constant/constant';
export default {
  name: 'PaypalButton',
  props: ['formOrderPaypal', 'changeDisable', 'sumPrice'],
  data: function () {
    return {
      loaded: false,
      paidFor: false,
      isDisable: true,
      product: {
        price: 2,
        description: 'Thanh toán đơn hàng',
        img: './assets/lamp.jpg',
      },
      PayOrderCustom: {
        name: {
          given_name: '',

          surname: '',
        },

        address: {
          address_line_1: '',

          admin_area_2: '',

          postal_code: '000085',

          country_code: 'VN',
        },

        email_address: '',

        phone: {
          phone_type: 'MOBILE',

          phone_number: {
            national_number: '',
          },
        },
      },
    };
  },
  watch: {
    formOrderPaypal: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (newValue) {
          this.PayOrderCustom.name.given_name =
            newValue.name;
          this.PayOrderCustom.name.surname = newValue.name;
          this.PayOrderCustom.address.address_line_1 =
            newValue.province_id;
          this.PayOrderCustom.address.admin_area_2 =
            newValue.district_id;
          this.PayOrderCustom.email_address =
            newValue.email;
          this.PayOrderCustom.phone.phone_number.national_number =
            newValue.phoneNumber;
        }
      },
    },
    changeDisable: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.isDisable = newValue;
      },
    },
    sumPrice: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.product.price =
          convertVietNamMoneyToUSD(newValue);
      },
    },
  },
  mounted: function () {
    const script = document.createElement('script');
    script.src =
      'https://www.paypal.com/sdk/js?client-id=AQWAA2yD0VOQWe6FiT0gwstdofaNJy9pXEqUO4HCfnfKz8lK0HZcCeu2YRs0N32U8_QEOdDzj0JOJWTj';
    script.addEventListener('load', this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
    setLoaded: function () {
      this.loaded = true;
      const $this = this;
      window.paypal
        .Buttons({
          onInit: function (data, actions) {
            if ($this.isDisable) {
              actions.disable();
            } else {
              actions.enable();
            }

            watch(
              () => $this.isDisable,
              (value) => {
                if (value) {
                  actions.disable();
                } else {
                  actions.enable();
                }
              }
            );
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: 'USD',
                    value: this.product.price,
                  },
                },
              ],
              payer: this.PayOrderCustom,
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            this.$emit('orderPaypal', order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(this.$refs.paypal);
    },

    toggleTest: function () {
      this.isDisable = !this.isDisable;
    },
  },
};
</script>
