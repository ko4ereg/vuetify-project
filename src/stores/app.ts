// Utilities
import { defineStore } from 'pinia'

export interface Tag {
  text: string
}

export interface Account {
  tags: Tag[]
  type: string
  login: string
  password?: string | null
}

export const useAppStore = defineStore('app', {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    addAccount (account: Account) {
      this.accounts.push(account)
      this.saveAccounts()
    },
    updateAccount (index: number, account: Account) {
      this.accounts[index] = account
      this.saveAccounts()
    },
    deleteAccount (index: number) {
      this.accounts.splice(index, 1)
      this.saveAccounts()
    },
    loadAccounts () {
      const saved = localStorage.getItem('accounts')
      if (saved) {
        this.accounts = JSON.parse(saved)
      }
    },
    saveAccounts () {
      localStorage.setItem('accounts', JSON.stringify(this.accounts))
    },
  },
})
