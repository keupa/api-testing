const request = require('./helpers/request');
const assert = require('chai').assert;
const session_param = {
    session_id: process.env.SESSION_ID
};

request.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

describe('Get top 5 movies and rate them', () =>{
    const content = {}
    const user = {}

    it('Get user id', async()=> {
        let response

        try{
            response = await request.get('/account', {
                params: session_param
            })
        }catch(err){
            response = err.response
        }
        assert.equal(
			response.status, 200, `\nError: ${JSON.stringify(response.data)}
        Message: `);

        user.account_id = response.data.id
        console.log(user.account_id)
    })

    it('Get 5 top rated movies', async() => {
        let response

        try{
            response = await request.get('/movie/top_rated', {
                params: session_param
            })
        } catch (err){
            response = err.response 
        }
        assert.equal(response.status, 200, `\nError: ${JSON.stringify(response.data)}
        Message: `)

        content.movies = response.data.results.slice(0,5)
    })

    it('Rate 5 top rated movies', async() => {
        let response
        let movie_list = content.movies

        for(var i = 0; i<movie_list.length; i++){
            try{
                response = await request.post(`/movie/${movie_list[i].id}/rating`, {
                    value: 7.5
                }, {
                    params: session_param
                })

            }catch(err){
                response = err.response 
            }

            assert.equal( response.status, 201, `\nError: ${JSON.stringify(response.data)}
            Message: `);
        } 
    })

        it('Rated movies added to watchlist', async() => {
            let response
            let movie_list = content.movies 

            for(i=0; i<movie_list.length; i++){
                try{
                    response = await request.post(`/account/${user.account_id}/watchlist`,{
                        media_type: "movie",
                        media_id: movie_list[i].id,
                        watchlist: true,
                    }, {
                        params: session_param
                    })
                }catch(err){
                    response = err.response
                }
                assert.equal( response.status, 201, `\nError: ${JSON.stringify(response.data)}
                Message: `);
            } 
        }) 


        it('Removes ratings', async() => {
            let response
            let movie_list = content.movies 

            for(i=0; i<movie_list.length; i++){
                try{
                    response = await request.delete(`/movie/${movie_list[i].id}/rating`, {
                        params: session_param
                    })
                }catch(err){
                    response = err.response
                }
                assert.equal( response.status, 200, `\nError: ${JSON.stringify(response.data)}
                Message: `);
            } 
        }) 


        it('Removes movies from watchlist', async() => {
            let response
            let movie_list = content.movies
            for(i=0; i<movie_list.length; i++){
                try{
                    response = await request.post(`/account/${user.account_id}/watchlist`,{
                        media_type: "movie",
                        media_id: movie_list[i].id,
                        watchlist: false,
                    }, {
                        params: session_param
                    })
                }catch(err){
                    response = err.response
                }
                assert.equal( response.status, 200, `\nError: ${JSON.stringify(response.data)}
                Message: `);
            } 
        })

    }) 
