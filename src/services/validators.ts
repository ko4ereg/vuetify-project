export function required (v: unknown): boolean | string {
  return !!v || 'Это поле обязательно для заполнения'
}

export function maxLength (max: number) {
  return (v: string): boolean | string => {
    return (v && v.length <= max) || `Максимальная длина ${max} символов`
  }
}
