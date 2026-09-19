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
    </div>
  </section>
</template>
