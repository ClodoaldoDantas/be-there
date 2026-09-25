<template>
  <form
    class="flex flex-col gap-4.5 rounded-3xl bg-white p-5 md:gap-5 md:border md:border-line md:p-7"
    @submit="onSubmit"
  >
    <BaseInput
      id="name"
      v-model="name"
      label="Seu nome completo"
      placeholder="Ex.: Maria Silva"
      :error="errors.name"
    />

    <BaseInput
      id="whatsapp"
      v-model="whatsapp"
      label="WhatsApp"
      placeholder="(11) 99999-0000"
      :mask="whatsappMask"
      :error="errors.whatsapp"
    />

    <fieldset>
      <legend class="flex items-center gap-1.5 text-xs font-semibold text-ink">
        Quantas pessoas vêm com você?
        <span class="hidden font-normal text-muted md:inline">máx. 3</span>
      </legend>

      <BaseNumberStepper
        v-model="attendants"
        :min="0"
        :max="3"
        class="mt-2"
      />
    </fieldset>

    <BaseButton
      type="submit"
      :is-loading="isSubmitting"
      :disabled="isSubmitting"
    >
      <Check class="hidden size-4.5 md:inline" />
      Confirmar presença
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { Check } from '@lucide/vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { delay } from '~/utils/delay'

const whatsappMask = ['(##) ####-####', '(##) #####-####']

const confirmationSchema = z.object({
  name: z.string().trim().min(3, 'Informe seu nome completo'),
  whatsapp: z
    .string()
    .min(1, 'Informe seu WhatsApp')
    .refine(value => /^\d{10,11}$/.test(value.replace(/\D/g, '')), 'WhatsApp inválido'),
  attendants: z.number().int().min(0).max(3)
})

type ConfirmationPayload = z.infer<typeof confirmationSchema>

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(confirmationSchema),
  initialValues: { name: '', whatsapp: '', attendants: 0 }
})

const [name] = defineField('name')
const [whatsapp] = defineField('whatsapp')
const [attendants] = defineField('attendants')

const onSubmit = handleSubmit(async (values) => {
  await delay(1500)

  const payload: ConfirmationPayload = {
    name: values.name.trim(),
    whatsapp: values.whatsapp.replace(/\D/g, ''),
    attendants: values.attendants
  }

  console.log(payload)

  await navigateTo('/confirmed')
})
</script>
