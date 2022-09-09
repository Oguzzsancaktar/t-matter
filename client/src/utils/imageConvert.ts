export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
    return reader.result
  })
}

export function base64ToJpeg(file, fileName: string) {
  return fetch(file)
    .then(res => res.blob())
    .then(blob => {
      return new File([blob], fileName, { type: 'image/jpeg' })
    })
}
