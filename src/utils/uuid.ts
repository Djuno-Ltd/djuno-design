const uuid = (length: number = 32) => {
  let a = new Uint32Array(5)
  window.crypto.getRandomValues(a)
  const rand1 = () => Math.random().toString(36).substring(2, 9)
  const rand2 = performance.now().toString(36).substring(1, 5)
  const rand3 = Array.from(a)
    .map((A) => A.toString(36))
    .join('')
  const rand = rand1() + rand2 + rand3
  let result = rand.replace(/\./g, '')
  while (result.length < length) {
    result += rand1()
  }
  return result.substring(0, length).replace(/\./g, '')
}

export default uuid
