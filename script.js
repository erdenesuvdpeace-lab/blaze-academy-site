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