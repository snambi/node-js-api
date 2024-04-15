const getMatches = ( team, year ) => {
    console.log("team: %s, year: %d", team, year);

    const data = {"data": {
        "x": 20,
        "y": 12
    }};

    return data;
}

const sayHello = ( input ) => {
    console.log("Say hello to %s", input);
    return { data : input };
};

module.exports = { getMatches, sayHello };