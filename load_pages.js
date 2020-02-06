const formatSlug = (title) => {
  if (!title) {
    return ""
  }
  const regex = / /gi
  return title
    .toLowerCase()
    .trim()
    .replace(regex, "-")
}

const loadPages = async (enPrefix, dePrefix) => {
  // create context via webpack to map over all markdown pages
  let pages = await require.context(
    `~/content/${enPrefix}/`,
    true,
    /\.md$/
  )

  pages = pages.keys().map(key => {
    // give back the value of each page context
    return pages(key)
  })

  pages = pages.map(service => {
    // give back the pages urls as strings in both languages
    return [
      `/${dePrefix}/${formatSlug(get(service, 'attributes.de_title', ''))}`
      `en/${enPrefix}/${formatSlug(get(service, 'attributes.en_title', ''))}`
    ]
  })

  console.log(flatten(pages))

  return flatten(pages)
}
