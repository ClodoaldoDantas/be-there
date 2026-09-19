<template>
  <section class="min-h-dvh w-full bg-bg px-4 py-12">
    <div class="mx-auto flex w-full max-w-md flex-col gap-6">
      <header class="flex flex-col gap-2">
        <span class="font-sans text-[10px] uppercase tracking-wider text-muted">
          Componentes
        </span>
        <h1 class="font-display text-3xl font-semibold text-ink">
          Design System
        </h1>
      </header>

      <div class="flex flex-col gap-5 rounded-2xl border border-line bg-white p-5">
        <div class="flex flex-col gap-2">
          <span class="font-sans text-[10px] uppercase tracking-wider text-muted">
            default
          </span>
          <BaseButton
            type="submit"
            aria-label="Confirmar presença"
          >
            Confirmar presença
          </BaseButton>
        </div>

        <div class="flex flex-col gap-2">
          <span class="font-sans text-[10px] uppercase tracking-wider text-muted">
            with icon
          </span>
          <BaseButton
            type="submit"
            aria-label="Confirmar presença"
          >
            <Check class="size-5" />
            Confirmar presença
          </BaseButton>
        </div>

        <div class="flex flex-col gap-2">
          <span class="font-sans text-[10px] uppercase tracking-wider text-muted">
            disabled
          </span>
          <BaseButton disabled>
            Confirmar presença
          </BaseButton>
        </div>

        <div class="flex flex-col gap-2">
          <span class="font-sans text-[10px] uppercase tracking-wider text-muted">
            outline
          </span>
          <BaseButton variant="outline">
            Confirmar presença
          </BaseButton>
        </div>
      </div>

      <div class="flex flex-col gap-5 rounded-2xl border border-line bg-white p-5">
        <div class="flex flex-col gap-2">
          <span class="font-sans text-[10px] uppercase tracking-wider text-muted">
            default
          </span>
          <BaseInput
            id="nome"
            label="Seu nome completo"
            placeholder="Ex.: Maria Silva"
          />
        </div>

        <div class="flex flex-col gap-2">
          <span class="font-sans text-[10px] uppercase tracking-wider text-muted">
            preenchido
          </span>
          <BaseInput
            id="nome"
            v-model="nome"
            label="Seu nome completo"
          />
        </div>

        <div class="flex flex-col gap-2">
          <span class="font-sans text-[10px] uppercase tracking-wider text-muted">
            erro
          </span>
          <BaseInput
            id="nomeInvalido"
            v-model="nomeInvalido"
            label="Seu nome completo"
            error="Informe nome e sobrenome."
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Check } from '@lucide/vue'

const nome = ref('Maria Silva')
const nomeInvalido = ref('Maria')
</script>
