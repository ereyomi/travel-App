/* const app = require('../server/server');
const supertest = require('supertest');
const request = supertest(app);

describe('POST endpoints correct', () => {
    it ('respond with json', async done => {
        const res =  await request.get('/')
        expect(res.status).toBe(200);
        done();
        request.post( '/api/getData' )
            .send( {
                location: 'lagos',
                departureDate: '2020-07-07',
            } )
            .set( 'Accept', 'application/json' )
            .expect( 'Content-Type', 'application/json' )
            .expect( 200 )
            .end( (err, res) => {
                if ( err ) return done( err );
                done();
        })
    })
})
 */