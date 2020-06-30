const getUserRelatedDate = (date) => {
    //global declearation for formatting date for UI
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const theDate = new Date( date )
    const month = theDate.getMonth()
    const day = theDate.getDay()
    const theDayInNumber = theDate.getDate()
    const  getTheYear = theDate.getFullYear()
    return `${ days[ day ] } ${ theDayInNumber }, ${ months[ month ]} ${getTheYear}`
}


const getDaysDifference = (pdate) => {
    /* get Days Difference */
    const toDate = pdate //'2020-06-26'
    //const getFuture = Math.ceil( ( new Date( toDate ) - Date.now() ) / ( 1000 * 60 * 60 * 24 ) ) >= 0
    //const isDayBefore = Math.ceil( ( new Date( toDate ) - new Date( toDate ) ) / ( 1000 * 60 * 60 * 24 ) ) > 0
    

    const todayDate = new Date()
    const departureDateRefact = new Date( toDate )
    const secondsTodeparture = ( departureDateRefact - todayDate ) / 1000;


    let seconds = Number( secondsTodeparture );
    const day = Math.floor( seconds / ( 3600 * 24 ) );
    const hour = Math.floor( seconds % ( 3600 * 24 ) / 3600 );
    const minute = Math.floor( seconds % 3600 / 60 );
    const second = Math.floor( seconds % 60 );

    const dayDisplay = ( day + 1 ) + " days";
    const hourDisplay = hour > 0 ? hour + ( hour == 1 ? " hour, " : " hours, " ) : "";
    const minuteDisplay = minute > 0 ? minute + ( minute == 1 ? " minute" : " minutes" ) : "";

    if ( day > 0 )
    {
        return dayDisplay
    } else if ( day === -1 )
    {
        return "today"

    } else if ( minute > 0 )
    {
        return hourDisplay + minuteDisplay

    } else
    {
        return `${ Math.abs( day )} days ago`
    } 
    
}

const createUUID = () => {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, ( char ) => {
        dt = Math.floor( dt / 16 );
        const r = ( dt + Math.random() * 16 ) % 16 | 0;
        return ( char === 'x' ? r : ( r & 0x3 | 0x8 ) ).toString( 16 );
    } );
   return uuid
}

export { getUserRelatedDate, getDaysDifference, createUUID }