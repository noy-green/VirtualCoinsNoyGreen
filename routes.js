
let data =[]

function home(outlet) {
  
    loadScript("/components/home/home.component.js")
  }
  
  function livereports(outlet) {
      
      loadContent('./components/liveReports/reports.html' , outlet)
      loadScript("/components/liveReports/livereports.component.js")
  }

  function about(outlet) {
    loadContent('./components/about/about.html' , outlet)
    loadScript("/components/about/about.component.js")
 
  }


  
  function loadContent(url, outlet) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET' , url)
      xhr.onload = function() {
          outlet.innerHTML = xhr.responseText;
      }
      xhr.send()
  
  }
  
  function loadScript(url) {

    const oldScript = document.querySelector('#dynamicScript')
    oldScript?.remove();
    const scriptTag = document.createElement('script');
    scriptTag.id = "dynamicScript"
    scriptTag.src = url;
    document.body.appendChild(scriptTag)   
     
  }
  
  export { home , about , livereports }