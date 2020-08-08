// var flag = false
// var informationsS = []
// var flagT = true
// window.onload = function () {
//     var xhr = new XMLHttpRequest;
//     xhr.onload = function () {
//         var main = document.getElementById("main")
//         var arr = (JSON.parse(xhr.responseText)).slice(0, 100)
//         console.log(arr.length)
//         for (var i = 0; i < arr.length; i++) {
//             main.innerHTML +=
//                 `<div class="card">
//             <div class="custom-control custom-switch"  >
//                 <input type="checkbox" class="custom-control-input" id="customSwitch${i + 1}">
//                 <label class="custom-control-label" for="customSwitch${i + 1}"></label>
//             </div>
//             <div class="card-body" >
//               <h5 class="card-title">${arr[i].symbol}</h5>
//               <p class="card-text">${arr[i].id}</p>
//             <div id="${arr[i].id}" class="info">
//               <a href="#" class="btn btn-primary">More Info</a>
//             </div>
//             </div>
//           </div>`
//         }

//         var informations = document.querySelectorAll(".info")
//         for (var i = 0; i < informations.length; i++) {
//             informations[i].addEventListener("click", morInfo)

//         }

//     }

//     xhr.open("GET", "https://api.coingecko.com/api/v3/coins/list")
//     xhr.send();

// }


// function timer(callback, delay) {
//     var id, started, remaining = delay, running

//     this.start = function () {
//         running = true
//         started = new Date()
//         id = setTimeout(callback, remaining)
//     }

//     this.pause = function () {
//         running = false
//         clearTimeout(id)
//         remaining -= new Date() - started
//     }

//     this.getTimeLeft = function () {
//         if (running) {
//             this.pause()
//             this.start()
//         }

//         return remaining
//     }

//     this.getStateRunning = function () {
//         return running
//     }

//     this.start()
// }



// function morInfo(e) {
//     e.preventDefault()
//     if (flag !== false) {
//         alert("You need to close the previous one")
//         return
//     }

    

//     // if (flagT==true) {
//     //     var timerS = new timer(function () {
//     //     }, 1800000)
//     // }
//     // else {
//     //     console.log(timerS.getTimeLeft())
//     // }

        
//     //     // var timeLeft = timerS.getTimeLeft();
//     //     // if (timeLeft > 1) {
//     //     //     var temp = localStorage.getItem('mylocals')
//     //     //     var infoFromS = JSON.parse(temp)
//     //     //     var obj = infoFromS.find(o => o.id === e.path[1].id);
//     //     //     console.log(obj)
            
//     //     // }
   

   
    

//     flag = true

//     var xhrinfo = new XMLHttpRequest;
//     xhrinfo.open("GET", `https://api.coingecko.com/api/v3/coins/${e.path[1].id}`)
//     xhrinfo.send();

//     xhrinfo.onload = function () {
//         flagT = false
       
//         var arrInfo = (JSON.parse(xhrinfo.responseText))
//         informationsS.push(arrInfo)
//         localStorage.setItem('mylocals', JSON.stringify(informationsS));



//         var div = e.path[3]
//         div.innerHTML +=
//             `<div class="card cardI" >
//                 <div id="img">
//                 <img src = ${arrInfo.image.small}>
//                 </div>
//                 <div class="card-body"  >
//                     <h5 class="card-title">${arrInfo.symbol}</h5>
//                     <p class="card-text">${arrInfo.id}<br>
//                     Current Price USD: ${arrInfo.market_data.current_price.usd}&#36<br>
//                     Current Price EUR: ${arrInfo.market_data.current_price.eur}&#8364;<br>
//                     Current Price ILS: ${arrInfo.market_data.current_price.ils}&#8362
//                     </p>
//                 </div>
//                 <div  class="back" >
//                     <a href="#" id="${arrInfo.symbol}" class="btn btn-primary">Back</a>
//                 </div>
//             </div>`


//         document.getElementById(`${arrInfo.symbol}`).addEventListener("click", back)

//         var informations = document.querySelectorAll(".info")
//         for (var i = 0; i < informations.length; i++) {
//             informations[i].addEventListener("click", morInfo)
//         }

//     }



// }

// function back(e) {
//     e.preventDefault()
//     var div = e.path[2]
//     div.remove();
//     flag = false
// }



