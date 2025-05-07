export function filterParams(params: string[], data: Record<string, any>) {
  return params.reduce(
    (acc, cur) => {
      if (Reflect.has(data, cur)) {
        acc[cur] = data[cur]
      }
      return acc
    },
    {} as Record<string, any>
  )
}
