<script setup lang="ts">
  import { type Account, useAppStore } from '@/stores/app'

  const store = useAppStore()

  const { accounts } = storeToRefs(store)

  onMounted(() => {
    store.loadAccounts()
  })

  function addAccount (): void {
    const newAccount: Account = { tags: [], type: '', login: '', password: '' }
    store.addAccount(newAccount)
  }

  function updateAccount (index: number, account: Account) {
    store.updateAccount(index, account)
  }

  function deleteAccount (index: number) {
    store.deleteAccount(index)
  }
</script>

<template>
  <div class="d-flex align-start pa-10">
    <div class="d-flex flex-column ga-2 w-100">
      <div class="d-flex ga-5 align-center">
        Учетные записи
        <v-btn
          :elevation="0"
          icon="mdi-plus"
          tile
          variant="outlined"
          @click="addAccount"
        />
      </div>

      <div
        class="d-flex ga-2 align-center"
        style="background-color: rgba(193, 198, 215, 0.53)"
      >
        <v-icon>mdi-help-circle-outline</v-icon>
        Для указания нескольких меток для одной пары логин/пароль используйте
        разделитель ;
      </div>

      <div class="d-flex ga-2 flex-column">
        <account
          v-for="(account, index) in accounts"
          :key="index"
          :account="account"
          :index="index"
          @delete-account="deleteAccount"
          @save-account="updateAccount"
        />
      </div>
    </div>
  </div>
</template>
