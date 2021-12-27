const titleSuffix = ' | Truth or Dare'

export const setSeoTitle = (title: string, displaySuffix = true) => {
    document.title = `${title}${displaySuffix ? titleSuffix : ''}`
}