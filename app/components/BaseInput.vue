<template>
  <div
    class="flex w-full flex-col gap-2"
  >
    <label
      v-if="label"
      :for="id"
      class="font-sans text-xs font-semibold text-ink"
    >
      {{ label }}
    </label>

    <input
      :id="id"
      v-model="model"
      class="w-full rounded-2xl border bg-white px-4 py-3.5 font-sans text-sm text-ink outline-none transition-colors placeholder:text-muted disabled:cursor-not-allowed disabled:bg-soft disabled:text-muted"
      :class="error ? 'border-error focus:border-error' : 'border-line focus:border-accent'"
    >

    <p
      v-if="error"
      class="flex items-center gap-1.5 font-sans text-xs text-error"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface BaseInputProps {
  id: string
  label?: string
  error?: string
}

const { id, label, error } = defineProps<BaseInputProps>()

const model = defineModel<string>()
</script>
