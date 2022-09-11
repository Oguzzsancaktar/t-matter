const constantToLabel = (constant: string) => {
  return constant
    ?.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export default constantToLabel
