let fs = require('fs');
let http = require('http');
let htmlfile = fs.readFileSync('index.html', "utf-8");
let requests = require('requests');

function replace (htmlfile,data){
    let result=htmlfile.replace("{%name%}",data.name);
   

    let temp=data.main.temp-273.15;
    console.log(temp);
    result=result.replace("{%temp%}",temp);
    result=result.replace("{%tempmin%}",data.main.temp_min);
    result=result.replace("{%tempmax%}",data.main.temp_max);
    result=result.replace("{%country%}",data.sys.country);
    result=result.replace("{%weatherstatus%}",data.weather[0].main);
    return result;
}

let server = http.createServer((req, res) => {
    if (req.url == "/") {
        //    let result=htmlfile.replace("{%hello i am icon%}",'Jay Karavadra');
        requests('https://api.openweathermap.org/data/2.5/weather?q=porbandar&appid=d061eaee7cb67a853b0b0f83820422ac')
            .on('data', function (chunk) {
                let data=JSON.parse(chunk);
                var replaced=replace(htmlfile,data);
                // console.log(replaced);
                res.end(replaced);
                
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);

                console.log('end');
               
            });
     
        
    }
})
server.listen(8000, "127.0.0.1");