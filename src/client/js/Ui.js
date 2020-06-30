import { getUserRelatedDate, getDaysDifference } from './helpers'
import { getSavedTrip, removeTrip } from './localStorage'

const openModalAndPopulateWithData = ( modalBox, data ) => {
    const modalDisplayBody = document.querySelector(".modal-body")
    modalDisplayBody.innerHTML = `
        <div class="imageHold"> 
            <img src=${data.pix ? data.pix.webformatURL : "./aaa.jpg" } alt=${ data.tags } srcset="">
        </div>
        <div class="details">
            <p>${data.location }, ${ data.countryName } is ${ getDaysDifference( data.departureDate) } away</p>
            <p>Typical Weather for then is</p>
            <p>
                High - ${data.max_temp ? data.max_temp : data.high_temp }, 
                low - ${ data.min_temp ? data.min_temp : data.low_temp}
            </p>
            <p>Most ${data.weather ? data.weather.description : "Calm"} throughout the day</p>
        </div>`
    modalBox.style.display = 'block'
}

/* update Ui */
const updateUi = () => {
    const tripsCardBox = document.querySelector( '#trips-card-box' )
    tripsCardBox.innerHTML = ''
    const  trips = getSavedTrip()
    if ( trips.length <= 0 )
    {
        tripsCardBox.innerHTML = `<p class="noData">You are yet to save any trip</p>`
    } else
    {
        trips.forEach( trip => {
            const createCard = document.createElement( 'div' )
            createCard.setAttribute('class', 'cards')
            createCard.innerHTML = `
                <div class="boxes a">
                    <div class="imageHold">
                        <img src=${trip.pix ? trip.pix.webformatURL : "./aaa.jpg" } alt=${ trip.tags } srcset="">
                    </div>
                </div>
                <div class="boxes b">
                    <p class="trip-to">
                        My trip to: ${trip.location }, ${ trip.countryName }
                    </p>
                    <p class="departure ">
                        Departing: ${getUserRelatedDate( trip.date ) }
                    </p>
                </div>
                <div class="boxes c">
                    <p>${trip.location }, ${ trip.countryName } is ${ getDaysDifference( trip.departureDate ) } away</p>
                    <p>Typical Weather for then is</p>
                    <p>
                        High - ${trip.max_temp ? trip.max_temp : trip.high_temp }, 
                        low - ${ trip.min_temp ? trip.min_temp : trip.low_temp }
                    </p>
                    <p>Most ${trip.weather ? trip.weather.description : "Calm" } throughout the day</p>
                </div>
                <div class="boxes d">
                    <button class="removeTrip" data-trip-id="${trip.id}">
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        remove Trip
                    </button>
                </div>
            `
            tripsCardBox.appendChild(createCard)
        });
    }

    const removeTriBtns = document.querySelectorAll( '.removeTrip' )
    removeTriBtns.forEach( removeTriBtn => {
        removeTriBtn.addEventListener( 'click', () => {
            const tripID = removeTriBtn.getAttribute( 'data-trip-id' )
            removeTrip(tripID )
        } )
    })
}
export { openModalAndPopulateWithData, updateUi }