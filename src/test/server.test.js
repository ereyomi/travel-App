const { getCoordinate } = require( '../server/server')


describe( "Test: the function 'getCoordinates()'", () => {

   test( 'It should be defined', async (done) => {
        await getCoordinate( 'lagos', 'ereyomi' ).then(
            data => {
                expect( data.geonames[0].name ).toBe('Lagos')
            }
        )
        done()
    } ); 

} );