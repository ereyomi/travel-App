import { createUUID } from './helpers'
import { updateUi } from './Ui'

const saveTrip = ( passedInData ) => {
    
    let userTrip = getSavedTrip()
    
    passedInData = {
        id: createUUID(),
        ...passedInData
    }
    userTrip.push(passedInData)
    
    localStorage.setItem( 'trip', JSON.stringify( userTrip ) )

    console.log( "saved: ", getSavedTrip())
    updateUi()
}
const getSavedTrip = () => {
    const savedTrip = localStorage.getItem( 'trip' )
        ? JSON.parse( localStorage.getItem( 'trip' ) )
        : []
    return savedTrip
}
const removeTrip = id => {
    console.log( id )
    const trips = getSavedTrip()
    const newtrips = trips.filter( data => data.id != id )

    localStorage.setItem( 'trip', JSON.stringify( newtrips ) )
    console.log( newtrips )
    updateUi()
}

export { saveTrip, getSavedTrip, removeTrip }