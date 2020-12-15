const request = require('./helpers/request');
const assert = require('chai').assert;
const session_param = {
    session_id: process.env.SESSION_ID
};

request.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

// start of homework 

// TEST: User gets the details of the first episode of the first season of a top rated “tv show”
describe("Get top rated tv show details", () => {
    const content = {};
    it("Get top rated TV shows", async () => {
      let response;
  
      try {
        response = await request.get("/tv/top_rated", {
          params: {
            language: "en-US",
            page: 1,
          },
        });
      } catch (err) {
        response = err.response;
      }
      assert.equal(response.status, 200, `\nError: ${JSON.stringify(response.data)} 
      Message: `);
      content.tv = response.data.results;
    });

    it("Get first season details of a TV show", async () =>{
        let response
        try{
            response = await request.get(`/tv/${content.tv[0].id}/season/1`)
        }catch(err){
            response = err.response
        }
        assert.equal(response.status, 200, `\nError: ${JSON.stringify(response.data)} 
        Message: `)
        content.ep_details = response.data.results;
    })
  }); 