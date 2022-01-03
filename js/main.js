

console.log(document.querySelector('title').textContent)


function ajax(url, metodo) {
    let xhr = new XMLHttpRequest
    xhr.open(metodo || 'get', url)
    xhr.send()

    return xhr
}

function getNombreArchivo(id) {
    return 'vistas/' + (id || 'home') + '.html'
}

function marcarLink(id) {
    let links = document.querySelectorAll('a')
    links.forEach( link => {
        if(link.id == id) link.classList.add('active')
        else link.classList.remove('active')
    })
}

/* Carga de la barra de navegación */
let header = document.querySelector('header')
let archivoHeader = getNombreArchivo('header')
let xhr = ajax(archivoHeader)

xhr.addEventListener('load', () => {
    if (xhr.status == 200) {
        header.innerHTML = xhr.response
        getPlantillas()

        let scriptHTML = document.createElement("script")
        scriptHTML.src = "../js/menu/carritoMenu.js"
        document.getElementsByTagName("body")[0].appendChild(scriptHTML)
    }
})


/* Carga del footer */
let footer = document.querySelector('footer')
let archivoFooter = getNombreArchivo('footer')
let xhr2 = ajax(archivoFooter)

xhr2.addEventListener("load", () =>{
    if(xhr2.status == 200){
        footer.innerHTML = xhr2.response
    }
})




function getPlantillas() {
    let main = document.querySelector('main')
    
    /* Carga inicial de la vista determinada por la url visitada */
    let id = location.hash.slice(1)
    marcarLink(id)

    let archivo = getNombreArchivo(id)
    let xhr = ajax(archivo)
    xhr.addEventListener('load', () => {
        if (xhr.status == 200) {
            let plantilla = xhr.response
            main.innerHTML = plantilla

            if(location.hash.slice(1) == "home" || !location.hash){
                let scriptListado = document.createElement("script")
                scriptListado.src = "../js/listado.js"
                document.getElementById("scripts-auxiliares").appendChild(scriptListado)

                scriptListado.addEventListener("load", () =>{
                    let scriptCard = document.createElement("script")
                    scriptCard.src = "../js/card.js"
                    document.getElementById("scripts-auxiliares").appendChild(scriptCard)
                })

                scriptListado.addEventListener("load", () =>{
                    let scriptSlideshow = document.createElement("script")
                    scriptSlideshow.src = "../js/slideshow.js"
                    document.getElementById("scripts-auxiliares").appendChild(scriptSlideshow)
                })
            }

            else if(location.hash.slice(1) == "alta"){
                let scriptAlta = document.createElement("script")
                scriptAlta.src = "../js/alta.js"
                document.getElementById("scripts-auxiliares").appendChild(scriptAlta)
            }
        }
    })

    /* Carga de cada uno de los links de la navbar */
    let links = document.querySelectorAll('a')
    //console.log(links)

    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()

            let id = link.id
            
            console.log(link)
            location.hash = id
        })
    })
    
    window.addEventListener('hashchange', () => {
        console.log('Cambió la URL')

        let id = location.hash.slice(1)
        marcarLink(id)

        let archivo = getNombreArchivo(id)
        let xhr = ajax(archivo)
        xhr.addEventListener('load', () => {
            if (xhr.status == 200) {
                let plantilla = xhr.response
                main.innerHTML = plantilla

                document.getElementById("scripts-auxiliares").innerHTML = ""
                if(location.hash.slice(1) == "home" || !location.hash){
                    let scriptListado = document.createElement("script")
                    scriptListado.src = "../js/listado.js"
                    document.getElementById("scripts-auxiliares").appendChild(scriptListado)
    
                    scriptListado.addEventListener("load", () =>{
                        let scriptCard = document.createElement("script")
                        scriptCard.src = "../js/card.js"
                        document.getElementById("scripts-auxiliares").appendChild(scriptCard)
                    })
                    
                    scriptListado.addEventListener("load", () =>{
                        let scriptSlideshow = document.createElement("script")
                        scriptSlideshow.src = "../js/slideshow.js"
                        document.getElementById("scripts-auxiliares").appendChild(scriptSlideshow)
                    })
                }

                else if(location.hash.slice(1) == "alta"){
                    let scriptAlta = document.createElement("script")
                    scriptAlta.src = "../js/alta.js"
                    document.getElementById("scripts-auxiliares").appendChild(scriptAlta)
                }
            }
        })
    })
}

