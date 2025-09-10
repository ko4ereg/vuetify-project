<script setup lang="ts">
  import { maxLength, required } from '@/services/validators'

  const emit = defineEmits(['delete-account', 'save-account'])
  const props = defineProps<{ index: number, account: any }>()

  const formRef = ref<any>(null)
  const tags = ref(props.account.tags?.map((t: any) => t.text).join(';') || '')
  const types = ['LDAP', 'Локальная']
  const type = ref(props.account.type || '')
  const login = ref(props.account.login || '')
  const password = ref(props.account.password || '')

  async function save (
    validate: () => Promise<{
      valid: boolean
      errors: { id: string | number, errorMessages: string[] }[]
    }>,
  ) {
    const isValid = await validate()
    if (isValid.valid) {
      const account = {
        tags: tags.value
          .split(';')
          .map((t: string) => t.trim())
          .filter(Boolean)
          .map((t: string) => ({ text: t })),
        type: type.value,
        login: login.value,
        password: password.value,
      }
      emit('save-account', props.index, account)
    }
  }

  function deleteAccount () {
    emit('delete-account', props.index)
  }

  watch(type, newType => {
    if (newType === 'LDAP') {
      password.value = null
    }
  })
</script>

<template>
  <v-form ref="formRef" v-slot="{ validate }">
    <div class="d-flex ga-2 align-start">
      <v-text-field
        v-model="tags"
        class="w-25"
        :counter-value="5"
        density="compact"
        label="Метки"
        :rules="[maxLength(50)]"
        type="text"
        variant="outlined"
        @blur="save(validate)"
      />
      <v-select
        v-model="type"
        class="w-25"
        density="compact"
        :items="types"
        label="Тип записи"
        :rules="[required]"
        variant="outlined"
        @change="save(validate)"
      />
      <v-text-field
        v-model="login"
        class="w-25"
        density="compact"
        label="Логин"
        :rules="[required, maxLength(100)]"
        type="text"
        variant="outlined"
        @blur="save(validate)"
      />
      <v-text-field
        v-if="type !== 'LDAP'"
        v-model="password"
        class="w-25"
        density="compact"
        label="Пароль"
        :rules="[required, maxLength(100)]"
        type="text"
        variant="outlined"
        @blur="save(validate)"
      />
      <v-btn
        color="error"
        icon="mdi-delete"
        size="40"
        tile
        @click="deleteAccount"
      />
    </div>
  </v-form>
</template>
