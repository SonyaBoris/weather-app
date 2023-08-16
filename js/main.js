const APIKEY = '4c8701c014ad00538678b3210951b827'

const $cardsBox = document.getElementById('cards-box')
const $locationForm = document.getElementById('location-form')
const $locaionInput = document.getElementById('location-form-input')
let currentCart = null

async function getWeatherData(location) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric`)

  const data = await response.json()

  return data
}

function getNewCart() {
  const $card = document.createElement('div')
  $card.classList.add('card')

  $card.innerHTML = `
  <div class="card__inner">
            <div class="card__head">
              <div class="card__head-left card-param">
                <div class="card__icon"></div>
                <div class="card__head-left-title">
                  <h3 class="card__title"></h3>
                  <span class="card__desc"></span>
                </div>
              </div>
              <div class="card__head-right card-param">
                <svg class="card-param-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                  viewBox="0 0 256 256">
                  <path fill="currentColor"
                    d="M132 156.29V88a4 4 0 0 0-8 0v68.29a28 28 0 1 0 8 0ZM128 204a20 20 0 1 1 20-20a20 20 0 0 1-20 20Zm36-68V48a36 36 0 0 0-72 0v88a60 60 0 1 0 72 0Zm-36 100a52 52 0 0 1-29.71-94.68A4 4 0 0 0 100 138V48a28 28 0 0 1 56 0v90a4 4 0 0 0 1.71 3.28A52 52 0 0 1 128 236Z" />
                </svg>
                <span class="card-param-text">
                  <span class="card-param-value card-param-value_temp"></span>
                  <sup>o</sup>C
                </span>
              </div>
            </div>
            <div class="card__footer">
              <div class="card__fooer-left card-param">
                <svg class="card-param-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                  viewBox="0 0 256 256">
                  <path fill="currentColor"
                    d="M182 184a30 30 0 0 1-30 30c-12.9 0-25.36-8.38-29.63-19.92a6 6 0 0 1 11.26-4.16C136.13 196.69 144.2 202 152 202a18 18 0 0 0 0-36H40a6 6 0 0 1 0-12h112a30 30 0 0 1 30 30ZM150 72a30 30 0 0 0-30-30c-12.9 0-25.36 8.38-29.63 19.92a6 6 0 1 0 11.26 4.16C104.13 59.31 112.2 54 120 54a18 18 0 0 1 0 36H24a6 6 0 0 0 0 12h96a30 30 0 0 0 30-30Zm58 2c-12.9 0-25.36 8.38-29.63 19.92a6 6 0 1 0 11.26 4.16C192.13 91.31 200.2 86 208 86a18 18 0 0 1 0 36H32a6 6 0 0 0 0 12h176a30 30 0 0 0 0-60Z" />
                </svg>
                <span class="card-param-text__footer">
                  <span class="card-param-value card-param-value_wind">
                    
                  </span>
                  m/c
                </span>
              </div>
              <div class="card__fooer-right card-param">
                <svg class="card-param-icon card-param-icon_footer" xmlns="http://www.w3.org/2000/svg" width="25"
                  height="25" viewBox="0 0 256 256">
                  <path fill="currentColor"
                    d="M37.16 74.81a4 4 0 0 1 0-5.64C37.87 68.47 54.72 52 88 52c17.21 0 29.92 8.48 42.22 16.67C142 76.55 153.21 84 168 84c29.77 0 45-14.69 45.18-14.84a4 4 0 0 1 5.65 5.67c-.7.7-17.55 17.17-50.83 17.17c-17.21 0-29.92-8.48-42.22-16.67C114 67.45 102.79 60 88 60c-29.77 0-45 14.69-45.18 14.84a4 4 0 0 1-5.66-.03Zm176 50.35C213 125.31 197.77 140 168 140c-14.79 0-26-7.45-37.78-15.33C117.92 116.48 105.21 108 88 108c-33.28 0-50.13 16.47-50.83 17.17a4 4 0 0 0 5.65 5.67C43 130.69 58.23 116 88 116c14.79 0 26 7.45 37.78 15.33c12.3 8.19 25 16.67 42.22 16.67c33.28 0 50.13-16.47 50.83-17.17a4 4 0 0 0-5.65-5.67Zm0 56C213 181.31 197.77 196 168 196c-14.79 0-26-7.45-37.78-15.33C117.92 172.48 105.21 164 88 164c-33.28 0-50.13 16.47-50.83 17.17a4 4 0 0 0 5.65 5.67C43 186.69 58.23 172 88 172c14.79 0 26 7.45 37.78 15.33c12.3 8.19 25 16.67 42.22 16.67c33.28 0 50.13-16.47 50.83-17.17a4 4 0 0 0-5.65-5.67Z" />
                </svg>
                <span class="card-param-text__footer">
                  <span class="card-param-value card-param-value_humidity">
                    
                  </span>
                  %
                </span>
              </div>
            </div>
          </div>
  `
  
  return {
    $card,
    $icon: $card.querySelector('.card__icon'),
    $title: $card.querySelector('.card__title'),
    $temp: $card.querySelector('.card-param-value_temp'),
    $desc: $card.querySelector('.card__desc'),
    $wind: $card.querySelector('.card-param-value_wind'),
    $humidity: $card.querySelector('.card-param-value_humidity'),
  }
}

$locationForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const newCard = getNewCart()

  const location = $locaionInput.value.trim()
  $locaionInput.value = ''

  $cardsBox.prepend(newCard.$card)

  setTimeout(async function () {
    newCard.$card.classList.add('loading')

    const data = await getWeatherData(location)

    newCard.$icon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`

    newCard.$title.textContent = data.name
    newCard.$desc.textContent = data.weather[0].description
    newCard.$temp.textContent = data.main.temp
    newCard.$wind.textContent = data.wind.speed
    newCard.$humidity.textContent = data.main.humidity


    console.log(data)

    setTimeout(function () {
      document.querySelector('.app__container').classList.add('app__container_top')

      document.body.style.backgroundImage = `url(img/${data.weather[0].icon}.jpeg)`

      if (currentCart !== null) {
        currentCart.$card.classList.add('glass')
      }

      currentCart = newCard

      newCard.$card.classList.remove('loading')
      newCard.$card.classList.add('full')
    }, 600)

  }, 30)
})