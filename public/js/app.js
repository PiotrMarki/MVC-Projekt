document.addEventListener("DOMContentLoaded", () => {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

  const ratingInputs = document.querySelectorAll('.rating-input input[type="radio"]')
  const starLabels = document.querySelectorAll(".star-label")

  starLabels.forEach((label, index) => {
    label.addEventListener("mouseenter", () => {
      highlightStars(index + 1)
    })

    label.addEventListener("mouseleave", () => {
      const checkedInput = document.querySelector('.rating-input input[type="radio"]:checked')
      if (checkedInput) {
        highlightStars(Number.parseInt(checkedInput.value))
      } else {
        highlightStars(0)
      }
    })

    label.addEventListener("click", () => {
      const input = document.getElementById(label.getAttribute("for"))
      input.checked = true
      highlightStars(Number.parseInt(input.value))
    })
  })

  function highlightStars(rating) {
    starLabels.forEach((label, index) => {
      const star = label.querySelector("i")
      if (index < rating) {
        star.style.color = "#ffc107"
      } else {
        star.style.color = "#ddd"
      }
    })
  }

  const ratingForm = document.getElementById("ratingForm")
  if (ratingForm) {
    ratingForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const rating = document.querySelector('input[name="rating"]:checked')
      if (!rating) {
        document.getElementById("ratingMessage").innerHTML =
          '<div class="alert alert-warning">Wybierz ocenę od 1 do 5 gwiazdek</div>'
        return
      }

      try {
        const cocktailId = window.location.pathname.split("/")[2]
        const response = await fetch(`/cocktails/${cocktailId}/rate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating: rating.value }),
        })

        const result = await response.json()

        if (result.success) {
          document.getElementById("ratingMessage").innerHTML =
            '<div class="alert alert-success">' + result.message + "</div>"

          setTimeout(() => {
            window.location.reload()
          }, 2000)
        } else {
          document.getElementById("ratingMessage").innerHTML =
            '<div class="alert alert-danger">' + result.error + "</div>"
        }
      } catch (error) {
        document.getElementById("ratingMessage").innerHTML =
          '<div class="alert alert-danger">Wystąpił błąd podczas oceniania</div>'
      }
    })
  }

  const alerts = document.querySelectorAll(".alert:not(.alert-permanent)")
  alerts.forEach((alert) => {
    if (!alert.querySelector(".btn-close")) {
      setTimeout(() => {
        alert.style.opacity = "0"
        setTimeout(() => {
          alert.remove()
        }, 300)
      }, 5000)
    }
  })

  const submitButtons = document.querySelectorAll('button[type="submit"]')
  submitButtons.forEach((button) => {
    button.closest("form").addEventListener("submit", () => {
      button.disabled = true
      const originalText = button.innerHTML
      button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Przetwarzanie...'

      setTimeout(() => {
        button.disabled = false
        button.innerHTML = originalText
      }, 5000)
    })
  })

  console.log("Aplikacja koktajli załadowana!")
})

function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  notification.style.cssText = "top: 20px; right: 20px; z-index: 9999; min-width: 300px;"
  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

window.CocktailApp = {
  showNotification,
}
