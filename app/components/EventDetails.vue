<template>
  <section class="flex flex-col gap-5.5">
    <header class="flex flex-col gap-2.5">
      <p class="text-xs font-semibold tracking-widest text-accent uppercase">
        Confirmação de presença
      </p>

      <h2 class="font-display text-3xl leading-tight font-semibold text-ink md:text-4xl lg:text-[2.5rem]">
        Você vem à festa?
      </h2>

      <p class="text-sm leading-normal text-muted">
        Confirme sua presença até 10 de junho. Assim a Helena sabe quantos pratos preparar.
      </p>
    </header>

    <div class="flex flex-col gap-3.5 md:flex-row md:gap-4 lg:gap-3.5">
      <article
        v-for="detail in details"
        :key="detail.label"
        class="flex flex-col gap-2.5 rounded-2xl border border-line bg-white p-4 md:flex-1"
      >
        <BaseIconWrap>
          <component
            :is="detail.icon"
            class="size-4"
          />
        </BaseIconWrap>

        <div class="flex flex-col gap-1">
          <p class="text-xs font-semibold tracking-widest text-muted">
            {{ detail.label }}
          </p>

          <p class="whitespace-pre-line text-sm leading-normal text-ink md:hidden">
            {{ detail.value }}
          </p>

          <p class="hidden whitespace-pre-line text-sm leading-normal text-ink md:block">
            {{ detail.valueWide }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Hourglass, MapPin, Shirt } from '@lucide/vue'

const details = [
  {
    icon: MapPin,
    label: 'Onde',
    value: 'Casa da Vó Helena\nRua das Acácias, 128 · Jardim Europa',
    valueWide: 'Casa da Vó Helena\nRua das Acácias, 128'
  },
  {
    icon: Hourglass,
    label: 'Horário',
    value: 'Chegada a partir das 19h\nJantar às 20h30',
    valueWide: 'Sábado, 14 de junho\nA partir das 19h'
  },
  {
    icon: Shirt,
    label: 'Traje',
    value: 'Casual chique, sem frescura',
    valueWide: 'Casual chique,\nsem frescura'
  }
]
</script>
