const request = require('./helpers/request');
const assert = require('chai').assert;
const session_param = {
    session_id: process.env.SESSION_ID
};

request.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

describe('Add movie to list', () => {
    const user = {};
    const content = {};

    it('Get account details', async () => {
        let response;

        try {
            response = await request.get('/account', {
                params: session_param
            });
        } catch (err) {
            response = err.response;
        }

        assert.equal(response.status, 200, `\nError: ${JSON.stringify(response.data)}
        Message: `);

        user.account = response.data;
    });

    describe('Get Content', () => {
        it('Get popular movies', async () => {
            let response; 

            try {
                response = await request.get('/movie/popular', {
                    params: {
                        language: 'en-US',
                        page: 1
                    }
                });
            } catch (err) {
                response = err.response;
            }

            assert.equal(response.status, 200, `\nError: ${JSON.stringify(response.data)}
            Message: `);

            content.movies = response.data.results; 
        });

        it('Get airing today tv shows', async () => {
            let response; 

            try {
                response = await request.get('/tv/airing_today', {
                    params: {
                        language: 'en-US',
                        page: 1
                    }
                });
            } catch (err) {
                response = err.response;
            }

            assert.equal(response.status, 200, `\nError: ${JSON.stringify(response.data)}
            Message: `);

            content.tv = response.data.results;
        });
    });

    describe('Create List and add content to it', () => {
        it('Create List', async () => {
            const date = new Date();
            let response;

            try {
                response = await request.post('/list', {
                        name: `This a new list ${date.toISOString()}`,
                        description: 'New List',
                        language: 'en'
                    }, {
                        params: session_param
                    });
            } catch (err) {
                response = err.response;
            }

            assert.equal(response.status, 201, `\nError: ${JSON.stringify(response.data)}
            Message: `);

            user.lists = [ response.data.list_id ]
        });

        it('Add movie to list', async () => {
            let response;

            try {
                response = await request.post(`/list/${user.lists[0]}/add_item`, {
                    media_id: content.movies[0].id
                }, {
                    params: session_param
                });
            } catch(err) {
                response = err.response;
            }

            assert.equal(response.status, 201, `\nError: ${JSON.stringify(response.data)}
            Message: `);

            await new Promise(r => setTimeout(r, 2000));
        });

        it('Add tv to list', async () => {
            let response;

            try {
                response = await request.post(`/list/${user.lists[0]}/add_item`, {
                    media_id: content.tv[0].id
                }, {
                    params: session_param
                });
            } catch(err) {
                response = err.response;
            }

            assert.equal(response.status, 201, `\nError: ${JSON.stringify(response.data)}
            Message: `);
        });
    });
});
