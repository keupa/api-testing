# API Testing Framework
This frameworks performs tests to back end services.
## Setup
### Requirements
 - node v10.18.0 or higher
 - yarn
### Installation
Install modules by executing the following command
```
    yarn install
```

### Env Variables
Set the following variables in an .env file:
```
    API_TOKEN={{api key}}
    SESSION_ID={{session id}}
    BASE_URL={{base url of api}}
```
Take [.env.example](.env.example) file as reference.

## Usage
### Run tests
Run test files by invoking it on command line:
```
    yarn mocha ./tests/fileName --config .mocharc.js
```

or add command on scripts section in the [package.json](package.json) file.

### Create test file
Test files should be added into [tests](tests/) folder, import request module from [helpers](tests/helpers/request.js) folder.
