<template>
  <DefaultLayout v-if="!isPlayGround" :class="pageClass"></DefaultLayout>
  <ClientOnly v-if="isPlayGround">
    <Suspense>
      <Playground></Playground>
    </Suspense>
  </ClientOnly>
</template>
<script lang="ts" setup>
import { useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { computed } from 'vue';
import Playground from './Playground.vue';

const { Layout: DefaultLayout } = DefaultTheme;
const route = useRoute();
const isPlayGround = computed(() =>
  route.data.filePath.startsWith('playground'),
);

const pageClass = computed(() => {
  if (route.data.filePath.startsWith('api')) return 'api-page';
  return '';
});
</script>
