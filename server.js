const http = require('http')
const fs = require('fs')

const readFile = (path) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

const delay = (ms) => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

const server = http.createServer(async (request, response) => {
    switch (request.url) {
        case '/home' : {
            try {
                const data = await readFile('pages/home.html')
                response.write(data)
                response.end()
            }
            catch(err) {
                response.write('some error')
                response.end()
            }
        } break

        case '/about' : {
            await delay(10000)
            const data = await readFile('pages/about.html')
            response.write(data)
            response.end()
        } break

        default : {
            response.write('404 not found page')
            response.end()
        }
    }
})

server.listen(3000)