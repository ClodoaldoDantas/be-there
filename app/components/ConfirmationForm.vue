<template>
  <form class="flex flex-col gap-4.5 rounded-3xl bg-white p-5 md:gap-5 md:border md:border-line md:p-7">
    <BaseInput
      id="name"
      v-model="name"
      label="Seu nome completo"
      placeholder="Ex.: Maria Silva"
    />

    <BaseInput
      id="whatsapp"
      v-model="whatsapp"
      label="WhatsApp"
      placeholder="(11) 99999-0000"
    />

    <fieldset>
      <legend class="flex items-center gap-1.5 text-xs font-semibold text-ink">
        Quantas pessoas vêm com você?
        <span class="hidden font-normal text-muted md:inline">máx. 3</span>
      </legend>

      <div class="mt-2 flex gap-2">
        <BaseButton
          v-for="value in attendants"
          :key="value"
          :variant="value === selected ? 'solid' : 'outline'"
          @click="selected = value"
        >
          {{ value }}
        </BaseButton>
      </div>
    </fieldset>

    <BaseButton type="submit">
      <Check class="hidden size-4.5 md:inline" />
      Confirmar presença
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { Check } from '@lucide/vue'

const name = ref('')
const whatsapp = ref('')
const selected = ref(0)
const attendants = Array.from({ length: 4 }, (_, i) => i)
</script>
