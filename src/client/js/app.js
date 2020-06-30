import { openModalAndPopulateWithData, updateUi } from './Ui'
import { getData, getPixData } from './fetchData'
import { saveTrip } from './localStorage'

const myapp = () => {
    
    updateUi()

    const addTripBtn = document.querySelector( '#addTrip' )
    //show entry form
    const entryForm = document.querySelector( '#entry-field' )
    // check what text was put into the form field
    

    addTripBtn.addEventListener( 'click', () => {
        console.log("click add trip")
        if ( entryForm.classList.contains('activateEntryForm'))
        {
            entryForm.classList.remove( 'activateEntryForm' )
        } else
        {
            entryForm.classList.add( 'activateEntryForm' )
        }
        
    })


    let rData = {}
    
    
    //modal
    const modalBox = document.querySelector( '.modal' )

    const closeModal = document.querySelector( '#close' )
    closeModal.addEventListener( 'click', () => {
        modalBox.style.display = 'none'
    } ) 

    
    const modalSaveBtn = document.querySelector( '#saveTrip' )
    
    modalSaveBtn.addEventListener( 'click', () => {
        saveTrip( rData )
        modalBox.style.display = 'none'
    } )

    
    const setAllToDefault = () => {
        document.querySelector( '#entry-location' ).value = ''
        document.querySelector( '#entry-date' ).value = ''
        entryForm.classList.remove( 'activateEntryForm' )
        submitBtn.innerHTML = 'Search'
        submitBtn.disabled = false
    }
    
    
    const submitBtn = document.querySelector( '#submitIt' )

    submitBtn.addEventListener( 'click', async ( event ) => {
        event.preventDefault()
        //disable button
        submitBtn.disabled = true

        submitBtn.innerHTML = 'Searching...'
       
        try {
            await getData()
                .then( d => {
                    getPixData(d)
                    .then( data => {
                        rData = {
                            ...d,
                            pix: data.hits[0]
                        }
                        openModalAndPopulateWithData( modalBox, rData )
                        // button
                        setTimeout( () => {
                            setAllToDefault()
                        }, 1000 )

                    })
                    .catch(error => alert("pls try searching again"))
                    
                } )
                .catch( error => alert( "pls try searching again" ) )


            
        } catch (error) {
            alert("An error occur")
        }
        
    })

    
    
    /* ------------------------------------ */

    
}

export { myapp }