// import { updateUi } from './updateUi'
// import { handleSubmit } from './formHandler'
//import { handleSubmit } from './formHandler'


const myapp = () => {
    
    const addTripBtn = document.querySelector( '#addTrip' )
    const submitBtn = document.querySelector( '#submitIt' )
    

    //show entry form
    const entryForm = document.querySelector( '#entry-field' )
    addTripBtn.addEventListener( 'click', () => {
        console.log("add")
        entryForm.classList.add('activateEntryForm')
    })
     

    submitBtn.addEventListener( 'click', () => {
        //disable button
        submitBtn.disabled = true
        //handleSubmit()
        //updateUi()
        console.log("ok")
        // button
        setTimeout( () => {
            submitBtn.disabled = false
        }, 1000)
    })

    
}

export { myapp }