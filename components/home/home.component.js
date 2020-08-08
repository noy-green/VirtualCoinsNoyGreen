var myInterval
clearInterval(myInterval);
// var flag = false
var informationsS = []
var flagT = true
var arrInfo = 0

if (coins === undefined){
    var coins = []
}

var countT = 0
var data = []
createCoins()
function createCoins() {
    var xhr = new XMLHttpRequest;
    xhr.onload = function () {
        var main = document.getElementById("main")
        var arr = JSON.parse(xhr.responseText)
        for (var i = 0; i < arr.length; i++) {
            if (i === 0) {
                main.innerHTML =
                    `<div class="card" id="Card${arr[i].symbol}">
                <div id="T${arr[i].symbol}" class="custom-control custom-switch divT"  >
                    <input type="checkbox" class="custom-control-input toggle" id="customSwitch${i + 1}">
                    <label class="custom-control-label" for="customSwitch${i + 1}"></label>
                </div>
                <div class="card-body" >
                  <h5 class="card-title"> ${arr[i].symbol}</h5>
                  <p class="card-text"> ${arr[i].id}</p>
                  <br>
                  <br>
                  <br>
                <div id="${arr[i].id}" >
                  <a href="#" class="btn btn-primary info">More Info</a>
                </div>
                </div>
              </div>`

            }
            else {
                main.innerHTML +=
                    `<div class="card" id="Card${arr[i].symbol}">
            <div id="T${arr[i].symbol}" class="custom-control custom-switch divT"  >
                <input type="checkbox" class="custom-control-input toggle" id="customSwitch${i + 1}">
                <label class="custom-control-label" for="customSwitch${i + 1}"></label>
            </div>
            <div class="card-body" >
              <h5 class="card-title">${arr[i].symbol}</h5>
              <p class="card-text">${arr[i].id}</p>
              <br>
              <br>
              <br>
            <div id="${arr[i].id}" >
              <a href="#" class="btn btn-primary info">More Info</a>
            </div>
            </div>
          </div>`
            }


        }

        var toggles = document.querySelectorAll(".toggle")
        for (var i = 0; i < toggles.length; i++) {
            toggles[i].addEventListener("click", create5)
        }

        var informations = document.querySelectorAll(".info")
        for (var i = 0; i < informations.length; i++) {
            informations[i].addEventListener("click", morInfo)

        }

        var search = document.getElementById("search")
        search.addEventListener("click", (searchCoin))

        if (coins != []){
            var togglesCreateCoins = document.querySelectorAll(".toggle")
            for (var i =0; i<coins.length; i++){
                for (var j = 0; j< togglesCreateCoins.length; j++){
                    if (coins[i]==togglesCreateCoins[j].parentElement.id.substr(1)){
                    (togglesCreateCoins[j].checked)=true
                    }
                }
            }
        }




    }

    xhr.open("GET", "https://api.coingecko.com/api/v3/coins")
    xhr.send();

  

}


function searchCoin(){
   let inputSearch = document.getElementById("inputSearch").value
   if (inputSearch == ""){
       alert ("You didnt type eny code coin")
       return
   }

   else{
       var main = document.getElementById("main")
       var cardbyid = document.getElementById(`Card${inputSearch}`)
       if (cardbyid == null){
           alert("There is no coin like you typed" )
           return
       }
       main.innerHTML = ''
       main.append(cardbyid)  
       document.getElementById("backFromSearch").addEventListener("click", createCoins)
       var n = (cardbyid.children[1].children[5].firstElementChild)
       n.addEventListener("click", morInfo)

}}




function morInfo(e) {
    console.log(e.path[3].children[0].children[0].checked)
    if (e.path[3].children[0].children[0].checked === true) {
        var tempM = true
    }
    e.preventDefault()
    // if (flag !== false) {
    //     alert("You need to close the previous one")
    //     return
    // }

    // flag = true

    var temp = localStorage.getItem('mylocals')
    infoFromS = JSON.parse(temp)
    if (infoFromS === null) {
        console.log("storage is null")
        createAPI(e, tempM)

    }
    else {
        var obj = (infoFromS.find(o => o.id === e.path[1].id));
        if (obj === undefined) {
            createAPI(e, tempM)


        }
        else {
            arrInfo = obj
            var D = (Date.parse(obj.time))
            var ND = Date.now()
            var test = (ND - D) / 1000
            if (test <= 40) {
                console.log(arrInfo)
                var div = e.path[3]
                div.innerHTML +=
                    `<div class="card cardI" >
             
                <center>
                    <div id="img">
                        <img src = ${arrInfo.image.small}>
                    </div>
                <center/>
                <div class="card-body"  >
                    <p class="price">
                        Current Price USD: ${arrInfo.market_data.current_price.usd}&#36<br>
                        Current Price EUR: ${arrInfo.market_data.current_price.eur}&#8364;<br>
                        Current Price ILS: ${arrInfo.market_data.current_price.ils}&#8362
                    </p>
                    <a href="#" id="${arrInfo.symbol}" class="btn btn-primary">Back</a>
                </div>
                
               
            </div>`
                if (tempM) {
                    e.path[3].children[0].children[0].checked = true
                }


                document.getElementById(`${arrInfo.symbol}`).addEventListener("click", back)

                var informations = document.querySelectorAll(".info")
                for (var i = 0; i < informations.length; i++) {
                    informations[i].addEventListener("click", morInfo)

                }
            }

            else {
                index = infoFromS.findIndex(x => x.id === e.path[1].id)
                console.log(infoFromS)
                infoFromS.splice(index, 1)


                createAPI(e, tempM)

            }
        }

    }
    var toggles = document.querySelectorAll(".toggle")
    for (var i = 0; i < toggles.length; i++) {
        toggles[i].addEventListener("click", create5)
    }

    if (document.getElementById(`${arrInfo.symbol}`)) {
        document.getElementById(`${arrInfo.symbol}`).addEventListener("click", back)
    }

}


var informations = document.querySelectorAll(".info")
for (var i = 0; i < informations.length; i++) {
    informations[i].addEventListener("click", morInfo)
}



function createAPI(e, tempM) {

   

    var xhrinfo = new XMLHttpRequest;
    xhrinfo.open("GET", `https://api.coingecko.com/api/v3/coins/${e.path[1].id}`)

    var progressBar = document.getElementById("progress");
    xhrinfo.upload.onprogress = function (e) {
        if (e.lengthComputable) {
            progressBar.max = e.total;
            progressBar.value = e.loaded;
        }
    }
    xhrinfo.upload.onloadstart = function (e) {
        progressBar.style.display = "inherit"
        progressBar.value = 0;
    }
    xhrinfo.upload.onloadend = function (e) {
        progressBar.value = e.loaded;
    }
    xhrinfo.send();


    xhrinfo.onload = function () {

        arrInfo = (JSON.parse(xhrinfo.responseText))
        saveStorage(arrInfo)

        var div = e.path[3]
        div.innerHTML +=
            `<div class="card cardI" >
                <center>
                    <div id="img">
                        <img src = ${arrInfo.image.small}>
                    </div>
                <center/>
                <div class="card-body"  >
                    <p class="price">
                        Current Price USD: ${arrInfo.market_data.current_price.usd}&#36<br>
                        Current Price EUR: ${arrInfo.market_data.current_price.eur}&#8364;<br>
                        Current Price ILS: ${arrInfo.market_data.current_price.ils}&#8362
                    </p>
                    <a href="#" id="${arrInfo.symbol}" class="btn btn-primary">Back</a>
                </div>
               
            </div>`

        if (tempM) {
            e.path[3].children[0].children[0].checked = true
        }

        document.getElementById(`${arrInfo.symbol}`).addEventListener("click", back)

        var informations = document.querySelectorAll(".info")
        for (var i = 0; i < informations.length; i++) {
            informations[i].addEventListener("click", morInfo)

        }

        var toggles = document.querySelectorAll(".toggle")
        for (var i = 0; i < toggles.length; i++) {
            toggles[i].addEventListener("click", create5)
        }




    }
}

function create5(e) {

    var coinT = e.path[1].id.substr(1)

    if (coins.includes(coinT)) {
        coins = coins.filter(coin => coin !== coinT)
    }

    else if (coins.length < 5 && !coins.includes(coinT)) {
        coins.push(coinT)
        console.log(coins)
        var informations = document.querySelectorAll(".info")
        for (var i = 0; i < informations.length; i++) {
            informations[i].addEventListener("click", morInfo)
        }

    }



    else if (coins.length >= 5) {


        e.path[1].children[0].checked = false
        let coinsPanel = document.getElementById("coinsPanel")
        coinsPanel.innerHTML =

            `<input type="checkbox" class="myCheck" id="${coins[0]}" checked><label> ${coins[0]}</label><br>
            <input type="checkbox" class="myCheck" id="${coins[1]}" checked><label> ${coins[1]}</label><br>
            <input type="checkbox" class="myCheck" id="${coins[2]}" checked><label> ${coins[2]}</label><br>
            <input type="checkbox" class="myCheck" id="${coins[3]}" checked><label> ${coins[3]}</label><br>
            <input type="checkbox" class="myCheck" id="${coins[4]}" checked><label> ${coins[4]}</label><br> `


        document.getElementById("myDialog").showModal()
        document.getElementById("saveCoins").addEventListener("click", changeCoins)
        document.getElementById("close").addEventListener("click", function () { document.getElementById("myDialog").close() })
    }
    var informations = document.querySelectorAll(".info")
    for (var i = 0; i < informations.length; i++) {
        informations[i].addEventListener("click", morInfo)
    }



}



function changeCoins() {

    // let coinsPanel = document.getElementById("coinsPanel")
    let arraycheckes = document.querySelectorAll(".myCheck");
    coins = []
    let toggles = document.querySelectorAll(".divT")
    console.log(toggles[0])

    for (var i = 0; i < arraycheckes.length; i++) {
        if (arraycheckes[i].checked === false) {
            var temp = `T${arraycheckes[i].id}`
            for (var j = 0; j < toggles.length; j++) {
                if (toggles[j].id === temp) {
                    toggles[j].children[0].checked = false;
                }
            }



        }
        else {

            coins.push(arraycheckes[i].id)

        }

    }
    document.getElementById("myDialog").close()

}



function back(e) {
    e.preventDefault()
    var div = e.path[4]
    div.remove();
    flag = false
}

function saveStorage(arrInfo) {
    if (infoFromS === null) {
        infoFromS = []
    }

    arrInfo.time = new Date()
    infoFromS.push(arrInfo)
    localStorage.setItem('mylocals', JSON.stringify(infoFromS));
}









