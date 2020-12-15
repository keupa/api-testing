const request = require('./helpers/request');
const assert = require('chai').assert;
const session_param = {
    session_id: process.env.SESSION_ID
};

request.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

// TEST: User marks a random movie from “now playing” list as favorite then gets favorite movies list
  describe('Mark movie as favorite', () =>{
      const user = {}
      const content = {}

      it ('Get account details', async () => {
          let response

          try{
              response = await request.get('/account', {
                  params: session_param
              })
          } catch(err) {
              response = err.response; 
          }

          assert.equal(response.status, 200, `\nError: ${JSON.stringify(response.data)}
          Message: `);

          user.account_id = response.data.id
          console.log(user.account_id)
      })

          it('Get random movie in theaters', async () =>{
            let random_number = Math.floor(Math.random() * (19 - 1 + 1) + 1)  
            let response 
              try{
                  response = await request.get('/movie/now_playing', {
                      params: {
                          language: 'en-US',
                          page: 1,
                      }
                  })
              } catch (err){
                  response = err.response 
              }

              assert.equal(response.status, 200, `\nError: ${JSON.stringify(response.data)}
              Message: `);
  
              content.movies_id = response.data.results[random_number].id; 
          }) 

        it('Mark movie as favorite', async() => {
                let response

                try{
                    response = await request.post(`/account/${user.account_id}/favorite`, {
                        "media_type": "movie",
                        "media_id": content.movies_id,
                        "favorite": true
                    }, {
                        params: session_param
                    })
                } catch (err){
                    response = err.response
                }

                
            assert.equal(response.status, 201, `\nError: ${JSON.stringify(response.data)}
            Message: `);
              })

        it('Get favorite movie list', async () => {
            let response 

            try{
                response = await request.get(`/account/${user.account_id}/favorite/movies`, {
                    params: session_param
                })
            }catch (err){
                response = err.response
            }

            assert.equal(response.status, 200, `\nError: ${JSON.stringify(response.data)}
            Message: `)

            content.favorites = response.data.results
        })



        it('Check if random movie is in list', async() => {
            let response
            try{
                response = await request.get(`/movie/${content.movies_id}/account_states`, {
                    params: session_param
                })
            }catch(err){
                response = err.response
            }
            
            assert.equal(response.data.favorite, true, `\nError: ${JSON.stringify(response.data)}
            Message: `)
           
        })
  })
