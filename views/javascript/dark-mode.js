const twitter_feed = document.querySelector('.twitter-timeline')
const q8prayers = document.querySelector('#q8prayers')

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList = ''
  document.body.classList.toggle('dark')
  twitter_feed.setAttribute('data-theme', 'dark')
  q8prayers.classList.toggle('dark')
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const newColorScheme = e.matches ? 'dark' : 'light'
  document.body.classList = ''
  document.body.classList.toggle(newColorScheme)
  twitter_feed.setAttribute('data-theme', newColorScheme)
  q8prayers.classList = ''
  q8prayers.classList.toggle(newColorScheme)
})
