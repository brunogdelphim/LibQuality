const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
const routes = express.Router();
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(logger('tiny'));
app.use(bodyParser.json());

function searchRepositories(input, page) {

    const options = {
        method: 'GET',
        headers: {
        'User-Agent': 'PostmanRuntime/7.26.5'
        }
    }

    const per_page = 100;

    const link = `https://api.github.com/search/repositories?q=${input}&page=${page}&per_page=${per_page}`

    const req = https.request(link, options, (res) => {
        if (res.statusCode != 200) {
            reject()
            return
        }

        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        })

        res.on('end', () => {
            let issues = JSON.parse(data)
            resolve(issues)
        });
    })
    
    req.end()

}
searchRepositories('react');

function gatherGitData(owner, repo, page) {
    function gatherData(owner, repo, page) {

        const result = new Promise((function(resolve, reject) {

            const options = {
                method: 'GET',
                headers: {
                'User-Agent': 'PostmanRuntime/7.26.5'
                }
            }

            const per_page = 100;

            const link = `https://api.github.com/repos/${owner}/${repo}/issues?accept=application/vnd.github.v3+json&sort=created&page=${page}&state=open&per_page=${per_page}`

            const req = https.request(link, options, (res) => {
                if (res.statusCode != 200) {
                    reject()
                    return
                }

                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                })

                res.on('end', () => {
                    let issues = JSON.parse(data)
                    resolve(issues)
                });
            })
            
            req.end()
        }));

        return result;        
    }

    function loopPages(owner, repo, page) {
        gatherData(owner, repo, page).then(result => {
            page++
            if (result.length >= 100) {
                //TODO: DEVE CONSOLIDAR
                loopPages(owner, repo, page)
            }
            else
                console.log(result)
        }).catch(erro => {
            console.log(erro)
        });
    }

    loopPages(owner, repo, page)
}
gatherGitData('facebook', 'react', 1);

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});