const service = require("./service");
const utils = require("./utils");
const u = require("url")

const router = async function( req, res){
    const urlParts = u.parse(req.url);
    console.log( "PathName: %s, query: %s", urlParts.pathname, urlParts.query );

    if( urlParts.pathname === "/api/v1/teams" && req.method === "GET" ){

        // extract the "team" and "year"
        const input = await utils.getParams(urlParts.query);
        
        // call the teams api
        const total = await service.getMatches( input.team, input.year);
        console.log("total: "+ total);
        //console.log(service.sayHello("xx"));

        // set the status code and content type
        res.writeHead( 200, { 'Content-Type': 'application/json'})

        // send data
        const data = { total_goals: total, team: input.team, year: input.year};
        console.log( data);
        res.end( JSON.stringify(data));
    }
};

module.exports = router;