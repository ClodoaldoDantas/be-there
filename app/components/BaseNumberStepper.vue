<template>
  <div
    class="flex w-full items-center justify-between gap-3 rounded-2xl border border-line bg-white p-2"
  >
    <button
      type="button"
      aria-label="Diminuir"
      :disabled="model <= min"
      class="inline-flex size-8.5 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-soft text-accent transition-colors hover:bg-line disabled:cursor-not-allowed disabled:opacity-40"
      @click="decrement"
    >
      <Minus class="size-4" />
    </button>

    <span class="flex-1 text-center font-sans text-base font-semibold text-ink">
      {{ model }}
    </span>

    <button
      type="button"
      aria-label="Aumentar"
      :disabled="model >= max"
      class="inline-flex size-8.5 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-soft text-accent transition-colors hover:bg-line disabled:cursor-not-allowed disabled:opacity-40"
      @click="increment"
    >
      <Plus class="size-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Minus, Plus } from '@lucide/vue'

interface BaseNumberStepperProps {
  min?: number
  max?: number
}

const { min = 0, max = 10 } = defineProps<BaseNumberStepperProps>()

const model = defineModel<number>({ default: 0 })

function decrement() {
  model.value = Math.max(min, model.value - 1)
}

function increment() {
  model.value = Math.min(max, model.value + 1)
}
</script>
