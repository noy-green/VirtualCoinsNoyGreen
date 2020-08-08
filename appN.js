import { home, livereports, about } from './routes.js'

window.onload = init

var firstInit = true

const routes = {
    home,
    livereports,
    about
}

function init() {
    if (firstInit) {
        selectRoute("home")
    }
    document.querySelector('nav>div>div').addEventListener('click', selectRoute)
}
 
function selectRoute(event) {
    if (firstInit) {
        const outlet = document.querySelector('#main')
        routes["home"](outlet)
        firstInit = false
    }

    else{
    event.preventDefault();
    if (event.target.nodeName !== "A") {
        return
    }

    var temp = event.target.textContent.replace(/ /g, '');
    const outlet = document.querySelector('#main')
    console.log(temp.toLowerCase())
    routes[temp.toLowerCase()](outlet)
}

}