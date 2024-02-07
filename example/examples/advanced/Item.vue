<template>
  <tr ref="itemRefEl">
    <template v-for="column in columns">
      <td
        :key="column.key"
        style="border-right: 1px solid #000; border-bottom: 1px solid #000; padding: 6px"
        :colspan="row.id === 0 && column.key === 'id' ? 2 : undefined"
        :rowspan="row.id === 0 && column.key === 'id' ? 2 : undefined"
        v-if="
          !(
            (row.id === 0 && column.key === 'name') ||
            (row.id === 1 && column.key === 'id') ||
            (row.id === 1 && column.key === 'name')
          )
        "
      >
        {{ `${row.id} - ${column.key} - ${row[column.key]}` }}
      </td>
    </template>
  </tr>
</template>

<script lang="ts" setup>
import { useObserverItem } from 'vue-tiny-virtual-list';

const props = withDefaults(
  defineProps<{
    row: any;
    columns: any[];
    resizeObserver: ResizeObserver | null;
  }>(),
  {
    row: {},
    columns: [] as any,
    resizeObserver: null,
  },
);

const { itemRefEl } = useObserverItem({
  resizeObserver: props.resizeObserver as ResizeObserver,
});
</script>
