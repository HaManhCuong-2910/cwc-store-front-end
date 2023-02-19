<template>
  <div class="input-search">
    <input type="text" placeholder="Search" />
    <font-awesome-icon
      icon="fa-solid fa-magnifying-glass"
    />
  </div>
</template>

<style lang="scss" scoped>
.input-search {
  position: relative;
  input {
    border: none;
    outline: none;
    background-color: #e5e5e5;
    padding: 10px 0px 10px 40px;
    font-size: 14px;
    border-radius: 18px;
  }

  svg {
    position: absolute;
    top: 12px;
    left: 12px;
    color: #1e1e1e;
    font-size: 18px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
