<template>
  <el-space direction="vertical" alignment="flex-start">
    <el-skeleton
      style="width: 240px"
      :loading="true"
      animated
    >
      <template #template>
        <el-skeleton-item
          style="width: 240px; height: 240px"
        />
        <div style="padding: 14px">
          <el-skeleton-item
            variant="h3"
            style="width: 50%"
          />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            "
          >
            <el-skeleton-item
              variant="text"
              style="margin-right: 16px"
            />
            <el-skeleton-item
              variant="text"
              style="width: 30%"
            />
          </div>
        </div>
      </template>
    </el-skeleton>
  </el-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LoadingCard',
  setup(props) {
    return {};
  },
});
</script>
