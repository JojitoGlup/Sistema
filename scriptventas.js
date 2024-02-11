var ventas = '';

function generador() {

    var num = document.getElementById("ea").value;
    ventas = `USE punto_venta;\nTRUNCATE ventas_detalles;\nDELETE FROM ventas;\nINSERT INTO ventas(ID, fecha, hora)VALUES \n(1,'` +
        generarFechaAleatoria() + "', '" + generarHoraAleatoria() + "'),";

    for (let index = 2; index <= num; index++) {
        ventas += "\n( " + index + " , '" + generarFechaAleatoria() +
            "' , '" + generarHoraAleatoria() + "'),";
    }

    // Validar y ajustar el último carácter
    if (ventas.endsWith(',')) {
        ventas = ventas.slice(0, -1) + ';';
    }
    ventas += `\nINSERT INTO ventas_detalles(idventas, idproductos) VALUES`;

    for (let i = 1; i <= num; i++) {
        var idventas = Math.floor(Math.random() * 10);
        for (let j = 0; j < idventas; j++) {
            ventas += "\n( " + i + "," + Math.floor(1 + (Math.random() * 10)) + " ),";

        }
    }
    if (ventas.endsWith(',')) {
        ventas = ventas.slice(0, -1) + ';';
    }
    document.getElementById("ola").innerHTML = ventas;
}



function generarFechaAleatoria() {
    var año = Math.floor(Math.random() * (2022 - 2000 + 1)) + 2000;
    var mes = Math.floor(Math.random() * 12) + 1;
    var dia = Math.floor(Math.random() * 31) + 1;
    var hora = Math.floor(Math.random() * 24);
    var minuto = Math.floor(Math.random() * 60);
    var segundo = Math.floor(Math.random() * 60);

    // Crea el objeto Date con los valores aleatorios
    var fechaAleatoria = new Date(año, mes - 1, dia, hora, minuto, segundo);

    // Formatea la fecha en el formato deseado (Año-Mes-Día)
    var fechaFormateada = fechaAleatoria.toISOString().split('T')[0];

    return fechaFormateada;
}

function generarHoraAleatoria() {
    // Generar horas, minutos y segundos aleatorios
    var horas = Math.floor(Math.random() * 24); // 0 a 23
    var minutos = Math.floor(Math.random() * 60); // 0 a 59
    var segundos = Math.floor(Math.random() * 60); // 0 a 59

    // Formatear la hora en formato HH:MM:SS
    var horaFormateada = padLeft(horas) + ":" + padLeft(minutos) + ":" + padLeft(segundos);

    return horaFormateada;
}

// Función auxiliar para rellenar con ceros a la izquierda
function padLeft(numero) {
    return numero < 10 ? "0" + numero : numero;
}

function generarSQL() {

    var archivo = document.createElement('a');
    var salida = ventas.replace(/\n/g, '\n').trim();

    archivo.setAttribute('href', 'data:text/plain;charset=utf-8,' +
        encodeURIComponent(salida));
    archivo.setAttribute('download', 'punto_venta.sql');

    archivo.style.display = 'none';

    document.body.appendChild(archivo);

    archivo.click();

    document.body.removeChild(archivo);

}
