<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'List',
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    onClick: {
      type: Function,
    },
  },
  setup() {
    const hoverIndex = ref<number>(-1);

    return {
      hoverIndex,
    };
  },
});
</script>

<template>
  <ul class='overflow-y-auto overflow-x-hidden'>
    <li
      v-for='(item, index) in dataList'
      :key='item.id || item.key || index'
      :class='$attrs.itemClass'
      @click='() => onClick?.(item)'
      @mouseenter='() => hoverIndex = index'
      @mouseleave='() => hoverIndex = -1'
    >
      <slot :item='item' :index='index' :hoverIndex='hoverIndex'>
        <span>{{item}}</span>
      </slot>
    </li>
  </ul>
</template>

<style scoped>
</style>