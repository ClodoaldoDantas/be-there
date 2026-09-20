<template>
  <div
    class="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-soft text-accent"
    :class="customClass"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface BaseIconWrapProps {
  class?: string
}

const { class: customClass } = defineProps<BaseIconWrapProps>()
</script>
