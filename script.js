
// MODELO DE DATOS

let mis_peliculas_iniciales = [
  { titulo: "Superlópez", director: "Javier Ruiz Caldera", "miniatura": "files/superlopez.png" },
  { titulo: "Jurassic Park", director: "Steven Spielberg", "miniatura": "files/jurassicpark.png" },
  { titulo: "Interstellar", director: "Christopher Nolan", "miniatura": "files/interstellar.png" }
];

localStorage.mis_peliculas = localStorage.mis_peliculas || JSON.stringify(mis_peliculas_iniciales);

// VISTAS

function indexView(peliculas) {
  //Vista principal

  //Router: Botón 'editar' de cada película.

  //Router: Añadimos el botón 'Ver' y la clase show.
  //Router: Añadimos el botón 'Añadir' y la clase new.
  //Router: Añadimos el botón 'Borrar' y la clase delete.
  //Router: Añadimos el botón 'Reset' y la clase reset.
  
  let i = 0;
  let view = "";

  while (i < peliculas.length) {
    view += `
                <div class="movie">
                   <div class="movie-img">
                        <img data-my-id="${i}" src="${peliculas[i].miniatura}" onerror="this.src='files/placeholder.png'"/>
                   </div>
                   <div class="title">
                       ${peliculas[i].titulo || "<em>Sin título</em>"}
                   </div>
                   <div class="actions">
                        <!--Insertar aquí botones de "Show" y "Delete"-->
                        
                        <button class="show" data-my-id="${i}">Ver</button>
                        <button class="edit" data-my-id="${i}">Editar</button>
                        <button class="delete" data-my-id="${i}">Borrar</button>
                      
                    </div>
                </div>\n`;
    i = i + 1;
  };

  view += `<div class="actions">
                        <!--Insertar aquí botones de "Añadir" y "Reset"-->
                        <button class="new" data-my-id="${i}">Añadir</button>
                        <button class="reset" data-my-id="${i}">Reset</button>
                    </div>`;

  return view;
}

function editView(i, pelicula) {
  
  //Router: Botón volver de la vista editView()
  //Router: Botón actualizar de la vista editView()
  
  return `<h2>Editar Película </h2>
                <div class="field">
                Título <br>
                <input  type="text" id="titulo" placeholder="Título" 
                        value="${pelicula.titulo}">
                </div>
                <div class="field">
                Director <br>
                <input  type="text" id="director" placeholder="Director" 
                        value="${pelicula.director}">
                </div>
                <div class="field">
                Miniatura <br>
                <input  type="text" id="miniatura" placeholder="URL de la miniatura" 
                        value="${pelicula.miniatura}">
                </div>
                <div class="actions">
                    <button class="update" data-my-id="${i}">
                        Actualizar
                    </button>
                    
                    <button class="index">
                        Volver
                    </button>
               `;
}

const showView = (pelicula) => {
  // Recibe como argumento el objeto que contiene la información película y con ello, debemos acceder a dos de sus atributos: titulo y director.

  //Router: Botón volver de la vista showView()

  return `
             <p>

             La película <b> ${pelicula.titulo} </b> 
             fue dirigida por <b> ${pelicula.director} </b>.
             
             </p>
             <div class="actions">
                <button class="index">Volver</button> 
             </div>`;
}

const newView = () => {
  // Vista que permite al usuario introducir una nueva película.
  
  //Router: Botón volver de la vista newView()

  //Router: Añadimos el botón 'Crear' y la clase create.
  

  return `<h2>Crear Película</h2>
                
                <div class="field">
                Título <br>
                <input  type="text" id="titulo" placeholder="Título">
                </div>
                
                <div class="field">
                Director <br>
                <input  type="text" id="director" placeholder="Director">
                </div>
                
                <div class="field">
                Miniatura <br>
                <input  type="text" id="miniatura" placeholder="URL de la miniatura">
                </div>


                <div class="actions">
                
                    <button class="index">Volver</button>

                    <button class="create">Crear</button>
                    
                </div>`;
}


// CONTROLADORES 
const indexContr = () => {
  let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
  document.getElementById('main').innerHTML = indexView(mis_peliculas);
};

const showContr = (i) => {
  //Se encarga de implementar la lógica/funcionalidad de la vista showView(pelicula).

  let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
  // Inicializamos una variable 'pelicula' donde almacenaremos la información asociada a la pelicula que se encuentre en la posición "i".
  document.getElementById("main").innerHTML = showView(pelicula);
  //Esa pelicula será el argumento de la vista showView(pelicula), que mostrará el título y directo de la película.

};

const newContr = () => {
  //Se encarga de implementar la lógica/funcionalidad de la vista newwView().
  document.getElementById("main").innerHTML = newView();

};

const createContr = () => {
  // Completar: controlador que crea una película nueva en el modelo guardado en localStorage
  // ...
  
  let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
  // Analiza la cadena JSON.
  mis_peliculas[mis_peliculas.length]= {
      titulo : document.getElementById("titulo").value,
      director : document.getElementById("director").value,
      miniatura : document.getElementById("miniatura").value
  // Pide al usuario que introduzca la información sobre la nueva película.
  };
  localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
  // Transforma el objeto JavaScript a una cadena JSON.
  indexContr();
};

const editContr = (i) => {
  let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
  document.getElementById('main').innerHTML = editView(i, pelicula);
};

const updateContr = (i) => {
  let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
  mis_peliculas[i].titulo = document.getElementById('titulo').value;
  mis_peliculas[i].director = document.getElementById('director').value;
  mis_peliculas[i].miniatura = document.getElementById('miniatura').value;
  localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
  indexContr();
};

const deleteContr = (i) => {
  // Completar:  controlador que actualiza el modelo borrando la película seleccionada
  // Genera diálogo de confirmación: botón Aceptar devuelve true, Cancel false
  let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
  if(window.confirm("¿Seguro que quieres borrar esta película?")){
      mis_peliculas.splice(i,1);
    //Eliminamos de la posición "i" un elemento.
      localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
  indexContr();

    //window.confirm(): Abre un cuadro de diálogo con el mensaje escrito entre comillas.
  }
};

const resetContr = () => {
  // Completar:  controlador que reinicia el modelo guardado en localStorage con las películas originales
  localStorage.mis_peliculas = JSON.stringify(mis_peliculas_iniciales);
  indexContr();

};

// ROUTER de eventos
const matchEvent = (ev, sel) => ev.target.matches(sel);
const myId = (ev) => Number(ev.target.dataset.myId);

// document.addEventListener('click', ev)
// Está asociando el evento "click" al objeto ev.
// Esta función se utiliza para asociar eventos a objetos.

document.addEventListener('click', ev => {
  if (matchEvent(ev, '.index')) indexContr();
  else if (matchEvent(ev, '.edit')) editContr(myId(ev));
  else if (matchEvent(ev, '.update')) updateContr(myId(ev));
  // Completar añadiendo los controladores que faltan
  else if (matchEvent(ev, ".show")) showContr(myId(ev)); //
  else if (matchEvent(ev, ".new")) newContr(myId(ev));
  else if (matchEvent(ev, ".create")) createContr(myId(ev));
  else if (matchEvent(ev, ".delete")) deleteContr(myId(ev));
  else if (matchEvent(ev, ".reset")) resetContr(myId(ev));
})

// Explicación de las iteraciones:

// Asocia el objeto "ev" con la clase index y llama al controlador indexContr().
// Si "ev" no está asociado a la clase index, asocialo a la clase edit y llama al controlador editContr(myId(ev)) pasándole la posición de la película que queremos editar.
// Si "ev" no está asociado a la clase edit, asocialo a la clase update y llama al controlador updateContr(myId(ev)) pasándole la posición de la película que queremos actualizar.

// Y así sucesivamente ...

// Inicialización      
//Inicializamos el controlador principal.
document.addEventListener('DOMContentLoaded', indexContr);
