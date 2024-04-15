const getParams = ( url ) => {

    if( url == null ){
        throw new Error("url is null");
    }

    let result = {};
    let q = url.split('&');
    q.forEach( x => {
        console.log(x);
        let y = x.split('=');
        console.log( y);
        if( y !== null && y.length==2 ){
            result[y[0]] = y[1];
        }
    });

    return result;
}

module.exports = { getParams };