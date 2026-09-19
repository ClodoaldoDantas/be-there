<template>
  <button
    :type="type"
    class="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-2xl border p-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:border-line disabled:bg-soft disabled:text-muted"
    :class="[variantClasses[variant], customClass]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface BaseButtonProps {
  variant?: 'solid' | 'outline'
  type?: 'button' | 'submit'
  class?: string
}

const variantClasses = {
  solid: 'border-transparent bg-accent text-white hover:bg-accent-hover',
  outline: 'border-line bg-white text-ink hover:bg-soft'
}

const { variant = 'solid', type = 'button', class: customClass } = defineProps<BaseButtonProps>()
</script>
