const getMatches = async ( team, year ) => {
    console.log("team: %s, year: %d", team, year);

    let team1totals = await findTeamMatches( team, year, true);
    let team2totals = await findTeamMatches( team, year, false);

    const total = team1totals + team2totals;

    return total;
}

const findTeamMatches = async ( team, year, team1 = true ) => {

    let url = null;
    if( team1 === true ){
        url = "https://jsonmock.hackerrank.com/api/football_matches?year=" + year + "&team1=" + team;
    }else{
        url = "https://jsonmock.hackerrank.com/api/football_matches?year=" + year + "&team2=" + team;
    }

    let matches = [];

    const response = await fetch( url );
    const json = await response.json();

    json.data.forEach(element => {
        matches.push(element);
    });
    //matches.push( json.data);

    // check whether there are additional pages
    if( json.total_pages > 1 ){
        
        for( i=2; i<= json.total_pages ; i++){
            let pageUrl = null;
            if( team1 === true ){
                pageUrl = "https://jsonmock.hackerrank.com/api/football_matches?year=" + year + "&team1=" + team + "&page="+ i;
            }else{
                pageUrl = "https://jsonmock.hackerrank.com/api/football_matches?year=" + year + "&team2=" + team + "&page="+ i;
            }

            const res = await fetch(pageUrl);
            const outjson = await res.json();

            matches.push( outjson.data);
        }
    }

    let result = 0;

    // now calculate the goals py going through the array
    for( i=0 ; i< matches.length; i++ ){
        if( team1 === true ){
            result = result + parseInt(matches[i].team1goals);
        }else{
            result = result + parseInt(matches[i].team2goals);
        }
    }

    return result;
}

const sayHello = ( input ) => {
    console.log("Say hello to %s", input);
    return { data : input };
};

module.exports = { getMatches, sayHello };