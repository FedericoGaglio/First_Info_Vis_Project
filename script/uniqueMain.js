/* -------------------------------------------------------------------- */

/*
* Variables
* */

width = 1400;
height = 650;

var dataset = [];
var flowersArrangements = [];
var update_loop = null;
var configurationNumber = 0;


/* -------------------------------------------------------------------- */

/*
* Declaration of canvas and functions for drawing objects
* */

svg = d3.select(".wrapper")
    .append("svg")
    .classed("canvas", true)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 " + width + " " + height + "");

/* Function that draws flowers */
function drawFlowers(data) {
    var flowers = svg.selectAll(".flower")
        .data(data)
        .enter()
        .append("image")
        .classed("flower", true)
        .attr('xlink:href', 'svg/flower.svg')
        .attr('width', 80)
        .attr('height', 80)
        .attr('x', function (d) {return d.x})
        .attr('y', function (d) {return d.y});
}

/* Function that draws butterflies */
function drawButterly(data) {
    var butterly = svg.selectAll(".but")
        .data(data)
        .enter()
        .append("image")
        .classed("but", true)
        .attr('xlink:href', 'svg/moths.svg')
        .attr('width', 70)
        .attr('height', 60)
        .attr('x', function (d) {return d.x})
        .attr('y', function (d) {return d.y});
}

/* -------------------------------------------------------------------- */

/*
* Arrangement
* */

function updateArrangement(data) {
    svg.selectAll(".but")
        .data(data)
        .transition()
        .duration(1000)
        .attr('x', function (d) {return d.x})
        .attr('y', function (d) {return d.y});
}

/* -------------------------------------------------------------------- */

function clear(){
    svg.selectAll(".flower")
        .remove();
    svg.selectAll(".but")
        .remove();
}

/* -------------------------------------------------------------------- */

function takeData() {
    flowersArrangements = dataset[configurationNumber];
}

/* -------------------------------------------------------------------- */

/*
* Core
* */

function init() {
    setTimeout(function (){
        d3.json("configuration.json",).then(function (data) {
            dataset = data;
            takeData();
            drawFlowers(flowersArrangements);
            drawButterly(flowersArrangements)
            addEventListener();
        });
    }, 0);
}

/* -------------------------------------------------------------------- */

function addEventListener() {
    d3.select("body").on("keydown", function () {
        /*82-->carattere ascii che sta per R*/
        if (d3.event.keyCode === 82) {
            if(configurationNumber === 9)
                configurationNumber = 0
            else
                configurationNumber++;
            clear();
            init();
        }
    });
}

/* -------------------------------------------------------------------- */

function shuffleArrangements() {
    updateArrangement(shuffle(flowersArrangements));
}

/* -------------------------------------------------------------------- */

function begin() {
    setTimeout(function (){
        update_loop = setInterval(shuffleArrangements, 2000);
    }, 1000);
}

/* -------------------------------------------------------------------- */

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

init();
begin();