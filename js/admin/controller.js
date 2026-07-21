//
// CONTROLADOR
// Escucha lo que hace el usuario (clicks, submits, escritura en filtros),
// le pide datos/cambios al Modelo y le pide a la Vista que se actualice.
// Acá también vive el estado propio de la pantalla (qué módulo está
// abierto ahora), que no es un dato del sistema sino de la UI.
//

import * as Model from "./model.js";
import * as View from "./view.js";

let moduloActual = "resumen";
let modoFormulario = "alta";
let idEnEdicion = null;

function cambiarModulo(nombreModulo) {
    moduloActual = nombreModulo;

    document.querySelectorAll(".admin-menu-link").forEach((boton) => {
        boton.classList.toggle("active", boton.dataset.module === nombreModulo);
    });

    const config = Model.configuracionModulos[nombreModulo];
    View.actualizarEncabezadoModulo(config);

    View.limpiarBusqueda();
    actualizarControlesModulo();

    if (nombreModulo === "resumen") {
        mostrarResumen();
    } else {
        mostrarModulo();
    }
}

function actualizarControlesModulo() {
    const config = Model.configuracionModulos[moduloActual];
    View.actualizarFiltroEstados(config.estados);
    View.mostrarHerramientasModulo(moduloActual === "resumen");
    View.actualizarBotonNuevo(Model.formulariosAlta[moduloActual]);
}

function mostrarResumen() {
    View.mostrarTarjetasResumen({
        incidenciasAbiertas: Model.contarIncidenciasAbiertas(),
        totalContenedores: Model.obtenerRegistros("contenedores").length,
        totalCamiones: Model.obtenerRegistros("camiones").length,
        funcionariosActivos: Model.contarFuncionariosActivos()
    });

    View.mostrarMensajeListaInicial();
    View.renderUltimasIncidencias(Model.obtenerUltimasIncidencias(5));
}

function mostrarModulo() {
    View.ocultarTarjetasResumen();
    View.mostrarMensajeSeleccionRegistro();

    const textoBusqueda = document.getElementById("searchInput").value;
    const estadoSeleccionado = document.getElementById("stateFilter").value;
    const registros = Model.filtrarRegistros(moduloActual, textoBusqueda, estadoSeleccionado);

    const lista = View.renderListaRegistros(moduloActual, registros);

    lista.querySelectorAll(".data-row").forEach((fila) => {
        fila.addEventListener("click", () => {
            const registro = Model.obtenerRegistroPorId(moduloActual, fila.dataset.id);
            mostrarDetalle(registro);
        });
    });
}

function mostrarDetalle(registro) {
    let datosExtra = {};

    if (moduloActual === "camiones") {
        datosExtra = {
            nombreChofer: Model.obtenerNombreChofer(registro.choferId),
            nombreRuta: Model.obtenerNombreRuta(registro.rutaId),
            choferesDisponibles: Model.obtenerChoferesDisponibles(),
            rutas: Model.obtenerRutas()
        };
    }

    const detalle = View.renderDetalle(moduloActual, registro, datosExtra);

    const botonEditar = detalle.querySelector("[data-editar]");
    if (botonEditar) {
        botonEditar.addEventListener("click", () => {
            abrirFormularioEdicion(botonEditar.dataset.editar);
        });
    }

    const botonAccion = detalle.querySelector("[data-accion]");
    if (botonAccion) {
        botonAccion.addEventListener("click", () => {
            const actualizado = Model.alternarBaja(moduloActual, botonAccion.dataset.id);
            if (!actualizado) return;

            mostrarModulo();
            mostrarDetalle(actualizado);
        });
    }

    const botonAsignar = detalle.querySelector("[data-guardar-asignacion]");
    if (botonAsignar) {
        botonAsignar.addEventListener("click", () => {
            const idCamion = botonAsignar.dataset.guardarAsignacion;
            const choferId = document.getElementById(`asignarChofer-${idCamion}`).value;
            const rutaId = document.getElementById(`asignarRuta-${idCamion}`).value;

            const camion = Model.asignarCamion(idCamion, choferId, rutaId);
            if (!camion) return;

            mostrarModulo();
            mostrarDetalle(camion);
        });
    }
}

//
// Alta y edición de registros
// (comparten el mismo modal; modoFormulario/idEnEdicion distinguen el caso)
//

function abrirFormularioAlta() {
    const config = Model.formulariosAlta[moduloActual];
    if (!config) return;

    modoFormulario = "alta";
    idEnEdicion = null;

    View.renderCamposFormulario(config, "alta");
    View.abrirModal();
}

function abrirFormularioEdicion(id) {
    const config = Model.obtenerConfigEdicion(moduloActual);
    const registro = Model.obtenerRegistroPorId(moduloActual, id);
    if (!config || !registro) return;

    modoFormulario = "editar";
    idEnEdicion = id;

    View.renderCamposFormulario(config, "editar", registro);
    View.abrirModal();
}

function manejarFormularioSubmit(evento) {
    evento.preventDefault();

    const config = Model.obtenerConfigEdicion(moduloActual);
    if (!config) return;

    const formulario = evento.target;
    const valoresCampos = {};

    config.campos.forEach((campo) => {
        valoresCampos[campo.nombre] = formulario.elements[campo.nombre].value;
    });

    View.cerrarModal();

    if (modoFormulario === "editar") {
        const actualizado = Model.editarRegistro(moduloActual, idEnEdicion, valoresCampos);
        mostrarModulo();
        if (actualizado) mostrarDetalle(actualizado);
    } else {
        Model.crearRegistro(moduloActual, valoresCampos);
        mostrarModulo();
    }
}

//
// Eventos globales de la pantalla
//

function iniciarEventos() {
    document.querySelectorAll(".admin-menu-link").forEach((boton) => {
        boton.addEventListener("click", () => {
            cambiarModulo(boton.dataset.module);
        });
    });

    document.getElementById("searchInput").addEventListener("input", mostrarModulo);
    document.getElementById("stateFilter").addEventListener("change", mostrarModulo);

    document.getElementById("newRecordBtn").addEventListener("click", abrirFormularioAlta);
    document.getElementById("formAlta").addEventListener("submit", manejarFormularioSubmit);

    document.querySelectorAll("#modalCerrar, #modalCancelar").forEach((boton) => {
        boton.addEventListener("click", View.cerrarModal);
    });

    document.getElementById("formModal").addEventListener("click", (evento) => {
        if (evento.target.id === "formModal") {
            View.cerrarModal();
        }
    });
}

export function initAdmin() {
    if (Model.usuarioActual.rol === "administrador") {
        iniciarEventos();
        cambiarModulo("resumen");
    } else {
        View.mostrarAccesoNoAutorizado();
    }
}
