async function handleSubmit ( event ) {
    event.preventDefault()

    // check what text was put into the form field
    const location = document.querySelector( '#entry-location' ).value
    const date = document.querySelector( '#entry-date' ).value
   

    //remove the attribute after 

    console.log( "::: Form Submitted :::", location )

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify( { location, date });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    };


    try {
        fetch("http://localhost:8081/api/getData", requestOptions)
        .then(response => response.json())
            .then( result => {
                console.log( result )
                Client.updateUi(result)
            })
        .catch(error => console.log('error', error));
    } catch (error) {
        console.log(error)
    }
    
    
}

export { handleSubmit }
