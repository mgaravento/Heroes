// Require de Express
const express = require ('express');

// Require de FS
const fs = require ('fs');
const { send } = require('process');

// Ejecución de Express
const app = express ();

// Levantando el Servidor en el puerto 3030
app.listen(3030, () => console.log('Server running in 3030 port'));

// Leyendo y parseando (en array) el contenido de heroes.json
const heroes = JSON.parse(fs.readFileSync(__dirname + '/heroes.json', 'utf-8'));

// Ruta Raíz / ➝ Home
let saludo = 'Ni Superman, Iron Man o La Mujer Maravilla son tan importantes cómo las y los Heroes de carne y hueso que encontrarás en este sitio. Esperamos que ellas y ellos te sirvan como inspiración para poder cumplir tus objetivos. Recuerda: ¡nunca pares de creer en ti!.'
app.get('/', function (req,res){
    res.send(saludo)
});

// Ruta /heroes ➝ se envía todo el array y Express lo parsea para el browser como JSON :D
app.get('/heroes', (req, res) => {
	res.send(heroes);
});


// Ruta /heroes/n ➝ se envía el nombre y profesión del héroe solicitado
app.get('/heroes/:n', (req, res) => {

    let idn = req.params.n

    for (let i=0; i< heroes.length; i++){
        if(idn == heroes[i].id){
            let heroe = heroes[i] ;
            return res.send('Hola, mi nombre es '+ heroes[i].nombre + ' y soy ' + heroes[i].profesion);
        }
    }
        return res.send('No se encontro el heroe' )  
	// Si se encuentra al héroe se envía el nombre y su profesión
    // Si NO se encuentra se envía el mensaje de no encontrado
    //probar  con la funcion .find de arrays
});

app.get("/heroes/detalle/:id", (req, res) => {
    let id = req.params.id
    const heroe = heroes.find(heroe => heroe.id == id);
    if (heroe) {
     res.send("Hola, mi nombre es " +  heroe.nombre + " y soy " + heroe.profesion);
    }else
    { res.send("No se encontró el héroe");
}
});




// Ruta /heroes/n/bio ➝ se envía la bio del héroe solicitado
app.get('/heroes/:n/bio/:ok?', (req, res) => {
   let id = req.params.n
   let ok = req.params.ok
    let thisHeroe = heroes.find (thisHeroe => thisHeroe.id == id)

        if (!thisHeroe){
            return res.send('No se encontro el heroe')
         }
        else if(thisHeroe && ok != 'ok'){
           return res.send('Soy '+ thisHeroe.nombre +' que lastima que no quieras saber mas de mi')
        }else if (thisHeroe && ok == 'ok'){
            return res.send(thisHeroe.resenia)
    }
}
);


// Ruta Créditos
app.get('/creditos', function(req, res){
    res.send('Martina Garavento')
})



// Ruta... ¿Pára qué sirve esto?
app.get('*', (req, res) => { // el * significa wildcard sino el req no matchea con ninguna ruta 
    //que asignamos nos va a tomar este respuesta 
    res.status(404).send('404 not found. <br> ¡Houston, poseemos problemas!')});
    