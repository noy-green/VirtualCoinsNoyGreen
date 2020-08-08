clearInterval(myInterval);

function createData(coins) {
    
    for (var i = 0; i < coins.length; i++) {
        data.push({
            type: "splineArea",
            showInLegend: true,
            name: coins[i],
            yValueFormatString: "$#,##0",
            xValueFormatString: "hh:mm:ss",
            dataPoints: []

        })
    }

    return (data)
}





var chart;

function graph(coins) {
    if (coins.length === 0) {
        alert("You must select at least one coin");
        return
    }

    chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Value In USD$"
        },
        axisY: {
            includeZero: false,
            prefix: "$"
        },
        toolTip: {
            shared: true
        },
        legend: {
            fontSize: 13
        },
        data: createData(coins)
    });


    chart.render();

    var stringCoins = coins.join()

    var url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${stringCoins}&tsyms=USD`

    myInterval = setInterval(function () { createApi(url, createDatapoinst) }, 2000)

}

graph(coins)

data = []

function createDatapoinst() {
    arrayCoins = JSON.parse(this.responseText)
    console.log(arrayCoins)
    var i = 0
    for (let key in arrayCoins) {
        if (chart.data[i].dataPoints > 15) {
            chart.data[i].dataPoints.splice(0, 1)
        }
        chart.data[i].dataPoints.push({ x: new Date(), y: arrayCoins[key].USD })
        i++

    }
    chart.render();

}

function createApi(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", cb);
    xhr.open('GET', url);
    xhr.send()
}
