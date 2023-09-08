const http = require('http')
http.createServer(function(req, res) {
    if(req.url === '/') {
        res.writeHead(200, {"Content-Type": "text/plain"})
        res.write('Done by parthik kumar das')
        res.end()
    } else if(req.url === '/bfhl') {
        console.log(req.method)
        if(req.method === 'GET') {
            res.writeHead(200, {"Content-Type": "text/plain"})
            res.write(JSON.stringify({"operation_code":1}))
            res.end()
        } else if(req.method === 'POST'){
            let body = '';
            req.on('data', (chunk) => {
              body += chunk.toString();
            });
        
            req.on('end', () => {
              let requestData;
              try {
                requestData = JSON.parse(body);
              } catch (error) {
                console.error('Error parsing JSON:', error);
                res.statusCode = 400;
                res.end('Bad Request');
                return;
              }    
              console.log('Received data:', requestData);
              let numbers = []
              let alphabets = []
              let highestAlphabet = []
              for(let i=0; i<requestData.data.length; i++) {
                if(isNaN(requestData.data[i])) alphabets.push(requestData.data[i])
                else numbers.push(requestData.data[i])
              }
              let flag = 0
              let max = 'A'
              for (const char of alphabets) {
                if (char.toLowerCase() > max) {
                    max = char
                    flag = 1
                }
              }
              if(flag) highestAlphabet.push(max)
                res.writeHead(200, {"Content-Type": "text/plain"})
                res.write(JSON.stringify({
                    "is_success": true,
                    "user_id": "parthik_kumar_das_17012003", 
                    "email" : "pd4473@srmist.edu.in",
                    "roll_number":"RA2011042010027",
                    "numbers": numbers,
                    "alphabets": alphabets, 
                    "highest_alphabet":highestAlphabet
                    }))
                res.end()
            });
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
      }
}).listen(3000, console.log('http://localhost:3000'))