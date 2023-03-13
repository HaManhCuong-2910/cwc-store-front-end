<template>
  <el-upload
    class="avatar-uploader-info text-center"
    :show-file-list="false"
    :auto-upload="false"
    action="#"
    list-type="picture"
    :on-change="handleChangeAvatar"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon-info"
      ><Plus
    /></el-icon>
  </el-upload>
</template>

<style scoped>
.avatar-uploader-info .avatar {
  width: 160px;
  height: 140px;
  display: block;
}
</style>

<style>
.avatar-uploader-info .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 200px;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader-info .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon-info {
  font-size: 28px;
  color: #8c939d;
  width: 160px;
  height: 140px;
  text-align: center;
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { UploadProps } from 'element-plus';
interface PAvatarUser {
  avatar: string;
}

export default defineComponent({
  components: {
    Plus,
  },
  props: ['avatar'],
  setup(props: PAvatarUser, { emit }) {
    const imageUrl = ref<any>(props.avatar);
    const handleChangeAvatar: UploadProps['onChange'] = (
      uploadFile,
      uploadFiles
    ) => {
      imageUrl.value = URL.createObjectURL(uploadFile.raw!);
      emit('changeAvatar', uploadFile.raw);
    };

    return {
      props,
      imageUrl,
      handleChangeAvatar,
    };
  },
});
</script>
