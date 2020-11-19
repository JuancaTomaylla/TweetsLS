// Variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners

eventListeners();

function eventListeners() {

    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento este listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []; // El operador || intenta buscar en localstorage los tweets sino los manda como un arreglo vacio

        console.log(tweets);

        crearHTML();
    })
}



// Funciones

function agregarTweet(e) {
    e.preventDefault();

    // Text Area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validacion
    if(tweet === '') {
        mostrarError('Un mensaje no puede ir vacío');

        return; //evita que se ejecuten más líneas de código
    } 

    const tweetObj = {
        id: Date.now(),
        tweet //Cuando la llave es igual al valor puedes poner solo uno
    }
    // Añadir al Arreglo de Tweets
    tweets = [...tweets, tweetObj];

    // Una vez agregado vamos a crear el HTML
    crearHTML();

    // Reiniciar el formulario cuando enviamos un tweet
    formulario.reset();

}


// Mostrar mensaje de error

function mostrarError(error) {
    const tweet = document.querySelector('#tweet').value;
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    
    // Insertarlo en el contenedor
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    

    // Eliminar la alerta después de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Muestra un listado de los tweets
function crearHTML() {
    
    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach( tweet => {

            // Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerHTML = 'X';

            // Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }



            // Crear el HTML
            const li = document.createElement('li');

            // Añadir el texto
            li.textContent = tweet.tweet;

            // Asignar el boton X
            li.appendChild(btnEliminar);

            // Insertarlo en el HTML
            listaTweets.appendChild(li);

        })
    }

    sincronizarStorage();

}

// Agrega los tweets actuales a LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina el tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id); // Filtramos todos excepto el que estamos eliminando
    crearHTML();
}


// Limpiar el HTML
function limpiarHTML() {
    while( listaTweets.firstChild) { //Mientras haya un li
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

