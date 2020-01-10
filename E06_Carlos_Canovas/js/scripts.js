const IMAGENES = ['bardo', 'braum', 'jhin', 'karma', 'kha', 'lee', 'lux', 'morgana', 'thresh', 'vayne', 'yasuo', 'zed'];

/*window.onload = function() {
    generarCSS();
    $('#empezar').on('click', continuar);
}*/

$(document).ready(function() {
    generarCSS();
    $('#empezar').on('click', continuar);
});

function generarCSS() {
    link = document.createElement('link');
    link.href = 'css/style.css';
    link.rel = 'stylesheet';
    $('head').append(link);
}

function nickname() {
    var nombre = $('#nombre').val();
    var nick = $('#nickname');
    $(nick).html(nombre);
}

function continuar() {
    $('#preparar_juego').removeClass('on');
    $('#preparar_juego').addClass('off');
    $('#juego_empezado').removeClass('off');
    $('juego_empezado').addClass('on');
    nickname();
    var dificultad = $('#dificultad').val();
    if (dificultad == 'facil') {
        $('#normal').removeClass('on');
        $('#normal').addClass('off');
        $('#dificil').removeClass('on');
        $('#dificil').addClass('off');
        $('#facil').removeClass('off');
        $('#facil').addClass('on');
        modoFacil();
    } else if (dificultad == 'normal') {
        $('#facil').removeClass('on');
        $('#facil').addClass('off');
        $('#dificil').removeClass('on');
        $('#dificil').addClass('off');
        $('#normal').removeClass('off');
        $('#normal').addClass('on');
        modoNormal();
    } else {
        $('#facil').removeClass('on');
        $('#facil').addClass('off');
        $('#normal').removeClass('on');
        $('#normal').addClass('off');
        $('#dificil').removeClass('off');
        $('#dificil').addClass('on');
        modoDificil();
    }
    var imagenes = document.querySelectorAll('.cardF');
    imagenes.forEach(element => {
        element.addEventListener('click', girar);
    });

    var imagenes = document.querySelectorAll('.cardN');
    imagenes.forEach(element => {
        element.addEventListener('click', girar);
    });

    var imagenes = document.querySelectorAll('.cardD');
    imagenes.forEach(element => {
        element.addEventListener('click', girar);
    });
    reloj();
}

function girar() {
    if (this.classList.contains(IMAGENES[0])) {
        $(this).css('background-image', 'url(./img/bardo.png)');
        $(this).addClass('seleccionada');
    } else if (this.classList.contains(IMAGENES[1])) {
        $(this).css('background-image', 'url(./img/braum.png)');
        $(this).addClass('seleccionada');
    } else if (this.classList.contains(IMAGENES[2])) {
        $(this).css('background-image', 'url(./img/jhin.png)');
        $(this).addClass('seleccionada');
    } else if (this.classList.contains(IMAGENES[3])) {
        $(this).css('background-image', 'url(./img/karma.png)');
        $(this).addClass('seleccionada');
    } else if (this.classList.contains(IMAGENES[4])) {
        $(this).css('background-image', 'url(./img/kha.png)');
        $(this).addClass('seleccionada');
    } else if (this.classList.contains(IMAGENES[5])) {
        $(this).css('background-image', 'url(./img/lee.png)');
        $(this).addClass('seleccionada');
    } else if (this.classList.contains(IMAGENES[6])) {
        $(this).css('background-image', 'url(./img/lux.png)');
        $(this).addClass('seleccionada');
    } else if (this.classList.contains(IMAGENES[7])) {
        $(this).css('background-image', 'url(./img/morgana.png)');
        $(this).addClass('seleccionada');
    } else if (this.classList.contains(IMAGENES[8])) {
        $(this).css('background-image', 'url(./img/thresh.png)');
        $(this).addClass('seleccionada');
    } else if (this.classList.contains(IMAGENES[9])) {
        $(this).css('background-image', 'url(./img/vayne.png)');
        $(this).addClass('seleccionada');
    } else if (this.classList.contains(IMAGENES[10])) {
        $(this).css('background-image', 'url(./img/yasuo.png)');
        $(this).addClass('seleccionada');
    } else if (this.classList.contains(IMAGENES[11])) {
        $(this).css('background-image', 'url(./img/zed.png)');
        $(this).addClass('seleccionada');
    }
    comparar_cartas();
}

function comparar_cartas() {
    seleccionadas = Array.prototype.slice.call(document.querySelectorAll('.seleccionada'));

    var dificultad;
    if (document.getElementById('facil').classList.contains('on')) {
        dificultad = '.cardF';
    } else if (document.getElementById('normal').classList.contains('on')) {
        dificultad = '.cardN';
    } else {
        dificultad = '.cardD';
    }

    if (seleccionadas.length == 2) {
        var cartas = Array.prototype.slice.call(document.querySelectorAll(dificultad));
        cartas.forEach(element => {
            element.removeEventListener('click', girar);
        });
        if (seleccionadas[0].classList.value == seleccionadas[1].classList.value) {
            seleccionadas.forEach(element => {
                element.removeEventListener('click', girar);
                element.classList.remove('seleccionada');
                element.classList.add('acertada');
            });
            setTimeout(function() {
                cartas.forEach(element => {
                    if (!element.classList.contains('acertada')) {
                        element.addEventListener('click', girar);
                    }
                });
            }, 100);
        } else {
            setTimeout(function() {
                seleccionadas.forEach(element => {
                    element.classList.remove('seleccionada');
                    element.style.backgroundImage = 'url(./img/logo_lol.png)';
                });
                cartas.forEach(element => {
                    if (!element.classList.contains('acertada')) {
                        element.addEventListener('click', girar);
                    }
                });
            }, 1500);
        }
    }
}

function modoFacil() {
    var contenedor = $('#facil');

    var clase = ['thresh', 'lee', 'zed', 'bardo'];
    var claseUsada = [0, 0, 0, 0]

    for (i = 0; i < 8; i++) {
        var carta = document.createElement('div');
        carta.id = 'cartaF';
        $(carta).addClass('carta');
        $(carta).addClass('cardF');
        $(contenedor).append(carta);
    }

    var todasCartas = document.querySelectorAll('.cardF');

    for (i = 0; i < 8; i++) {
        var rdm = Math.floor(Math.random() * 4);
        while (claseUsada[rdm] >= 2) {
            rdm = Math.floor(Math.random() * 4);
        }
        claseUsada[rdm]++;
        todasCartas[i].classList.add(clase[rdm]);
    }
}

function modoNormal() {
    var contenedor = $('#normal');

    var clase2 = ['thresh', 'lee', 'zed', 'bardo', 'kha', 'morgana', 'karma', 'yasuo'];
    var claseUsada = [0, 0, 0, 0, 0, 0, 0, 0]

    for (i = 0; i < 16; i++) {
        var carta = document.createElement('div');
        carta.id = 'cartaN';
        $(carta).addClass('carta');
        $(carta).addClass('cardN');
        $(contenedor).append(carta);
    }

    var todasCartas = document.querySelectorAll('.cardN');

    for (i = 0; i < 16; i++) {
        var rdm = Math.floor(Math.random() * 8);
        while (claseUsada[rdm] >= 2) {
            rdm = Math.floor(Math.random() * 8);
        }
        claseUsada[rdm]++;
        todasCartas[i].classList.add(clase2[rdm]);
    }
}

function modoDificil() {
    var contenedor = $('#dificil');

    var clase = ['thresh', 'lee', 'zed', 'bardo', 'kha', 'morgana', 'karma', 'yasuo', 'jhin', 'braum', 'vayne', 'lux'];
    var claseUsada = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for (i = 0; i < 24; i++) {
        var carta = document.createElement('div');
        carta.id = 'cartaD';
        $(carta).addClass('carta');
        $(carta).addClass('cardD');
        $(contenedor).append(carta);
    }

    var todasCartas = document.querySelectorAll('.cardD');

    for (i = 0; i < 24; i++) {
        var rdm = Math.floor(Math.random() * 12);
        while (claseUsada[rdm] >= 2) {
            rdm = Math.floor(Math.random() * 12);
        }
        claseUsada[rdm]++;
        todasCartas[i].classList.add(clase[rdm]);
    }
}

function girar_todas() {
    seleccionadas = Array.prototype.slice.call(document.querySelectorAll('.carta'));
    seleccionadas.forEach(element => {
        if (element.classList.contains(IMAGENES[0])) {
            $(element).css('background-image', 'url(./img/bardo.png)');
            $(element).addClass('seleccionada');
        } else if (element.classList.contains(IMAGENES[1])) {
            $(element).css('background-image', 'url(./img/braum.png)');
            $(element).addClass('seleccionada');
        } else if (element.classList.contains(IMAGENES[2])) {
            $(element).css('background-image', 'url(./img/jhin.png)');
            $(element).addClass('seleccionada');
        } else if (element.classList.contains(IMAGENES[3])) {
            $(element).css('background-image', 'url(./img/karma.png)');
            $(element).addClass('seleccionada');
        } else if (element.classList.contains(IMAGENES[4])) {
            $(element).css('background-image', 'url(./img/kha.png)');
            $(element).addClass('seleccionada');
        } else if (element.classList.contains(IMAGENES[5])) {
            $(element).css('background-image', 'url(./img/lee.png)');
            $(element).addClass('seleccionada');
        } else if (element.classList.contains(IMAGENES[6])) {
            $(element).css('background-image', 'url(./img/lux.png)');
            $(element).addClass('seleccionada');
        } else if (element.classList.contains(IMAGENES[7])) {
            $(element).css('background-image', 'url(./img/morgana.png)');
            $(element).addClass('seleccionada');
        } else if (element.classList.contains(IMAGENES[8])) {
            $(element).css('background-image', 'url(./img/thresh.png)');
            $(element).addClass('seleccionada');
        } else if (element.classList.contains(IMAGENES[9])) {
            $(element).css('background-image', 'url(./img/vayne.png)');
            $(element).addClass('seleccionada');
        } else if (element.classList.contains(IMAGENES[10])) {
            $(element).css('background-image', 'url(./img/yasuo.png)');
            $(element).addClass('seleccionada');
        } else if (element.classList.contains(IMAGENES[11])) {
            $(element).css('background-image', 'url(./img/zed.png)');
            $(element).addClass('seleccionada');
        }
    });
}

function puntuacion() {
    var dificultades = '[{"tiempo" : 60},{"tiempo" : 90},{"tiempo" : 120}]';
    var objetos = JSON.parse(dificultades);
    $('#preparar_juego').removeClass('on');
    $('#juego_empezado').removeClass('on');
    $('#puntuaciones').removeClass('off');
    $('#preparar_juego').addClass('off');
    $('#juego_empezado').addClass('off');
    $('#puntuaciones').addClass('on');

    var tiempo_limite;
    if (document.getElementById('facil').classList.contains('on')) {
        tiempo_limite = objetos[0].tiempo;
    } else if (document.getElementById('normal').classList.contains('on')) {
        tiempo_limite = objetos[1].tiempo;
    } else {
        tiempo_limite = objetos[2].tiempo;
    }
    var tiempo_invertido = tiempo_limite - document.getElementById('time').innerHTML;
    var nombre = document.getElementById('nombre').value;
    var puntuacion = (tiempo_limite - tiempo_invertido) * 100;
    var tabla = document.getElementById('tabla_puntuaciones');
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');

    td1.innerHTML = nombre;
    td2.innerHTML = puntuacion;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tabla.appendChild(tr);

    var btn = document.createElement('button');
    btn.innerHTML = 'Juegar otra vez';
    btn.classList.add('btn2');
    $('#reiniciar').append(btn);
    $('#reiniciar').on('click', reiniciar)
}

function reloj() {
    var dificultades = '[{"tiempo" : 60},{"tiempo" : 90},{"tiempo" : 120}]';
    var objetos = JSON.parse(dificultades);

    var s;
    if (document.getElementById('facil').classList.contains('on')) {
        s = objetos[0].tiempo;
    } else if (document.getElementById('normal').classList.contains('on')) {
        s = objetos[1].tiempo;
    } else {
        s = objetos[2].tiempo;
    }
    var cartasF = document.querySelectorAll('.cardF');
    var cartasN = document.querySelectorAll('.cardN');
    var cartasD = document.querySelectorAll('.cardD');
    var interval = setInterval(function() {
        var acertada = true;
        cartasF.forEach(element => {
            if (!element.classList.contains('acertada')) {
                acertada = false;
            }
        });
        cartasN.forEach(element => {
            if (!element.classList.contains('acertada')) {
                acertada = false;
            }
        });
        cartasD.forEach(element => {
            if (!element.classList.contains('acertada')) {
                acertada = false;
            }
        });
        if (s > 0) {
            s--;
            if (s < 10) {
                s = '0' + s;
            }
        } else {
            s = 0;
            if (s < 10) {
                s = '0' + s;
            }
            clearInterval(interval);
            girar_todas();
            var btn = document.createElement('button');
            btn.innerHTML = 'Puntuación';
            btn.classList.add('btn');
            document.getElementById('puntos').appendChild(btn);
            document.getElementById('puntos').addEventListener('click', puntuacion);

        }
        if (acertada) {
            clearInterval(interval);
            var btn = document.createElement('button');
            btn.innerHTML = 'Puntuación';
            btn.classList.add('btn');
            document.getElementById('puntos').appendChild(btn);
            document.getElementById('puntos').addEventListener('click', puntuacion);
        }
        document.getElementById('time').innerHTML = s;
    }, 1000);

}

function reiniciar() {
    document.getElementById('facil').innerHTML = '';
    document.getElementById('normal').innerHTML = '';
    document.getElementById('dificil').innerHTML = '';
    document.getElementById('puntos').innerHTML = '';
    document.getElementById('reiniciar').innerHTML = '';

    document.getElementById('preparar_juego').classList.remove('off');
    document.getElementById('preparar_juego').classList.add('on');
    document.getElementById('juego_empezado').classList.remove('on');
    document.getElementById('juego_empezado').classList.add('off');
    document.getElementById('puntuaciones').classList.remove('on');
    document.getElementById('puntuaciones').classList.add('off');
}