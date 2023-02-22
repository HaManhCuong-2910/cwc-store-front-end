<template>
  <span ref="lineProduct"></span>
</template>

<style lang="scss" scoped>
.lineProduct {
  display: inline-block;
  width: 80%;
  height: 2px;
  background: linear-gradient(to right, #2980b9, #2c3e50);
  animation: runAnimated linear 0.6s;
}
@keyframes runAnimated {
  from {
    opacity: 0;
    width: 0%;
  }
  to {
    opacity: 1;
    width: 80%;
  }
}
</style>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import ScrollReveal from 'scrollreveal';
export default defineComponent({
  setup() {
    const lineProduct = ref<any>();

    const afterRevealCustom = (domEl: HTMLElement) => {
      domEl.classList.add('lineProduct');
    };
    const beforeRevealCustom = (domEl: HTMLElement) => {
      domEl.classList.remove('lineProduct');
    };

    watch(
      () => lineProduct.value,
      () => {
        if (lineProduct.value) {
          ScrollReveal().reveal(lineProduct.value, {
            opacity: 1,
            delay: 300,
            beforeReveal: beforeRevealCustom,
            afterReveal: afterRevealCustom,
          });
        }
      }
    );

    return {
      lineProduct,
    };
  },
});
</script>
