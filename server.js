var http = require("http");
var url = require("url");
var crg = require("country-reverse-geocoding").country_reverse_geocoding();

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var query = url.parse(request.url, true).query
    console.log("Request for " + pathname + " received.");

    response.writeHead(200, {"Content-Type": "text/plain"});

    // response.write("Hello World");
    // response.write("path is " + pathname);
    // response.write("lat is: " + query['lat']);
    // response.write("lat is: " + query['lon']);
    
    var lat = parseFloat(query['lat'])
    var lon = parseFloat(query['lon'])
    var country = crg.get_country(lat, lon);
    console.log("country " + country);
    if(country && (typeof country.name == 'string')){
      response.write(country.name);
    }
    
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;