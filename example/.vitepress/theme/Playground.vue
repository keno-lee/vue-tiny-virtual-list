<template>
  <Repl
    :editor="Monaco"
    style="height: 100vh"
    :store="store"
    :theme="data.isDark.value ? 'dark' : 'light'"
  />
</template>
<script lang="ts" setup></script>
