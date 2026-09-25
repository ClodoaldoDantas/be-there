<template>
  <section class="flex flex-1 flex-col items-center justify-center gap-5.5 px-10 py-14 text-center md:min-h-[calc(100dvh-23.25rem)] md:gap-6 lg:min-h-0 lg:gap-6.5">
    <BaseIconWrap class="size-16 md:size-20 lg:size-22">
      <Check class="size-6.5 md:size-8 lg:size-9" />
    </BaseIconWrap>

    <h1 class="font-display text-2xl leading-tight font-semibold text-ink md:max-w-115 md:text-4xl lg:max-w-130 lg:text-[2.5rem]">
      Presença confirmada!
    </h1>

    <p class="text-sm leading-normal text-muted md:max-w-115 md:text-base lg:max-w-130">
      Muito obrigado! A Maria já foi avisada que você vem.
    </p>
  </section>
</template>

<script setup lang="ts">
import { Check } from '@lucide/vue'
</script>
