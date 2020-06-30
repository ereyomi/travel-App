
const getData = () => {
    const location = document.querySelector( '#entry-location' ).value
    const departureDate = document.querySelector( '#entry-date' ).value

        //remove the attribute after 

        console.log( "::: Form Submitted :::", location, departureDate )

        var myHeaders = new Headers();
        myHeaders.append( "Accept", "application/json" );
        myHeaders.append( "Content-Type", "application/json" );

        var raw = JSON.stringify( { location, departureDate } );

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };


    return new Promise( ( resolve, reject ) => {
        try
        {
            fetch( "http://localhost:8081/api/getData", requestOptions )
                .then( response => response.json() )
                .then( result => {
                    resolve ( result )
                } )
                .catch( error => reject (error) )
        } catch ( error )
        {
            reject (error)
        }
    })
}
const getPixData = ( { location, countryName } ) => {
    
    var myHeaders = new Headers();
    myHeaders.append( "Accept", "application/json" );
    myHeaders.append( "Content-Type", "application/json" );

    var raw = JSON.stringify( { location, countryName } );

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };


    return new Promise( ( resolve, reject ) => {
        try
        {
            fetch( "http://localhost:8081/api/getImage", requestOptions )
                .then( response => response.json() )
                .then( result => {
                    resolve( result )
                } )
                .catch( error => reject( error ) )
        } catch ( error )
        {
            reject( error )
        }
    } )
}

export {getData, getPixData}