var cookieParser = require('cookie-parser')
var express = require('express')
var timeout = require('connect-timeout')

// example of using this top-level; note the use of haltOnTimedout
// after every middleware; it will stop the request flow on a timeout
var app = express()
app.use(timeout('2s', {
    respond: false
}))
app.use(express.json())
app.use(cookieParser())
app.use(haltOnTimedout)

// Add your routes here, etc.

function haltOnTimedout(req, res, next) {
    if (!req.timedout) next()
}

app.get('/', async function (req, res) {
    try {
        await new Promise(resolve => setTimeout(resolve, 3000))
        if (req.timedout) {
            req.respond = false;
            return;
        }
        console.log("[Request Executed]")
        res.send('Hello World!')

    } catch (error) {
        console.log("[Request Timeout] ", error)
    }
})

app.listen(3000)