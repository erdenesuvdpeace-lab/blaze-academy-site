import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js'
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where
} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js'

const mobileMenuButton =
  document.getElementById(
    'mobileMenuButton'
  )

const mobileNav =
  document.getElementById(
    'mobileNav'
  )

if (
  mobileMenuButton &&
  mobileNav
) {

  mobileMenuButton.addEventListener(
    'click',
    () => {
      mobileNav.classList.toggle(
        'open'
      )
    }
  )

}

const yearElement =
  document.getElementById('year')

if (yearElement) {
  yearElement.textContent =
    new Date().getFullYear()
}

const firebaseConfig = {
  apiKey: 'AIzaSyAnD_h6c8bMmmze5Qb_bbNlDjmGKsYniaM',
  authDomain: 'portal.blaze-academy.org',
  projectId: 'digital-gobi-platform',
  storageBucket: 'digital-gobi-platform.firebasestorage.app',
  messagingSenderId: '1013961714090',
  appId: '1:1013961714090:web:cf12694b98461ba402e3d3'
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

const createNewsCard = (item, index) => {
  const article = document.createElement('article')
  article.className =
    index === 0
      ? 'news-card news-card-featured'
      : 'news-card'

  if (item.imageUrl) {
    const imageWrap = document.createElement('div')
    imageWrap.className = 'news-card-image'

    const image = document.createElement('img')
    image.src = item.imageUrl
    image.alt = item.title || 'Blaze Academy шинэ мэдээлэл'
    image.loading = 'lazy'

    imageWrap.appendChild(image)
    article.appendChild(imageWrap)
  }

  const body = document.createElement('div')
  body.className = 'news-card-body'

  const accent = document.createElement('div')
  accent.className = 'news-accent'
  body.appendChild(accent)

  const meta = document.createElement('div')
  meta.className = 'news-meta'

  const date = document.createElement('span')
  date.className = 'news-date'
  date.textContent = item.publishDate || ''

  const tag = document.createElement('span')
  tag.className = 'news-tag'
  tag.textContent = item.category || 'МЭДЭЭ'

  meta.append(date, tag)

  const title = document.createElement('h3')
  title.textContent = item.title || ''

  const summary = document.createElement('p')
  summary.textContent = item.summary || ''

  body.append(meta, title, summary)
  article.appendChild(body)

  return article
}

const loadWebsiteNews = async () => {
  const grid = document.querySelector('#news .news-grid')

  if (!grid) return

  try {
    const snapshot = await getDocs(
      query(
        collection(db, 'websiteNews'),
        where('published', '==', true)
      )
    )

    const rows = snapshot.docs
      .map((item) => ({
        id: item.id,
        ...item.data()
      }))
      .sort((a, b) =>
        String(b.publishDate || '').localeCompare(
          String(a.publishDate || '')
        )
      )
      .slice(0, 3)

    if (rows.length === 0) {
      return
    }

    grid.replaceChildren(
      ...rows.map(createNewsCard)
    )

  } catch (error) {
    console.error(
      'WEBSITE NEWS LOAD ERROR:',
      error
    )
  }
}

loadWebsiteNews()
