<template>
  <button
    :type="type"
    :disabled="isLoading || disabled"
    class="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-2xl border p-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:border-line disabled:bg-soft disabled:text-muted"
    :class="[variantClasses[variant], customClass]"
  >
    <LoaderCircle
      v-if="isLoading"
      class="size-5 animate-spin"
    />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { LoaderCircle } from '@lucide/vue'

interface BaseButtonProps {
  variant?: 'solid' | 'outline'
  type?: 'button' | 'submit'
  isLoading?: boolean
  disabled?: boolean
  class?: string
}

const variantClasses = {
  solid: 'border-transparent bg-accent text-white hover:bg-accent-hover',
  outline: 'border-line bg-white text-ink hover:bg-soft'
}

const { variant = 'solid', type = 'button', isLoading = false, disabled = false, class: customClass } = defineProps<BaseButtonProps>()
</script>
