//
// VISTA
// Todo lo que arma o actualiza el HTML que ve el usuario.
// Estas funciones reciben datos ya calculados (por el controlador, que a
// su vez los pide al modelo) y los pintan en pantalla. Ninguna función de
// acá decide QUÉ mostrar según reglas de negocio: solo CÓMO mostrarlo.
//

export function claseEstado(estado) {
    return estado
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll("_", "-");
}

export function crearDetalleItem(titulo, valor) {
    return `
        <div class="detail-item">
            <span>${titulo}</span>
            <strong>${valor}</strong>
        </div>
    `;
}

//
// Encabezado y controles del módulo
//

export function actualizarEncabezadoModulo(config) {
    document.getElementById("moduleTitle").textContent = config.titulo;
    document.getElementById("moduleDescription").textContent = config.descripcion;
}

export function actualizarFiltroEstados(estados) {
    const filtro = document.getElementById("stateFilter");

    filtro.innerHTML = `<option value="todos">Todos los estados</option>`;

    estados.forEach((estado) => {
        filtro.innerHTML += `<option value="${estado}">${estado}</option>`;
    });
}

export function limpiarBusqueda() {
    document.getElementById("searchInput").value = "";
}

export function mostrarHerramientasModulo(esResumen) {
    document.getElementById("moduleTools").style.display = esResumen ? "none" : "grid";
}

export function actualizarBotonNuevo(configAlta) {
    const nuevoBtn = document.getElementById("newRecordBtn");

    if (configAlta) {
        nuevoBtn.style.display = "inline-flex";
        nuevoBtn.textContent = `+ ${configAlta.titulo}`;
    } else {
        nuevoBtn.style.display = "none";
    }
}

//
// Resumen
//

export function mostrarTarjetasResumen(stats) {
    const resumen = document.getElementById("summaryCards");
    resumen.style.display = "grid";

    resumen.innerHTML = `
        <article class="resumen-card">
            <span>Incidencias abiertas</span>
            <strong>${stats.incidenciasAbiertas}</strong>
        </article>

        <article class="resumen-card">
            <span>Contenedores registrados</span>
            <strong>${stats.totalContenedores}</strong>
        </article>

        <article class="resumen-card">
            <span>Camiones registrados</span>
            <strong>${stats.totalCamiones}</strong>
        </article>

        <article class="resumen-card">
            <span>Funcionarios activos</span>
            <strong>${stats.funcionariosActivos}</strong>
        </article>
    `;
}

export function ocultarTarjetasResumen() {
    document.getElementById("summaryCards").style.display = "none";
}

export function mostrarMensajeListaInicial() {
    document.getElementById("moduleList").innerHTML = `
        <div class="empty-state">
            Seleccione un módulo del menú lateral para consultar sus registros.
        </div>
    `;
}

export function mostrarMensajeDetalleInicial() {
    document.getElementById("detailPanel").innerHTML = `
        <p class="detail-empty">
            En esta vista se muestra un resumen general. Para ver detalles,
            ingrese a Incidencias, Contenedores o Camiones.
        </p>
    `;
}

// Pinta en el panel de detalle de Resumen las últimas incidencias reportadas.
export function renderUltimasIncidencias(incidencias) {
    const detalle = document.getElementById("detailPanel");

    if (incidencias.length === 0) {
        detalle.innerHTML = `
            <p class="detail-empty">
                Todavía no hay incidencias reportadas.
            </p>
        `;
        return;
    }

    const filas = incidencias
        .map((incidencia) => `
            <div class="resumen-incidencia">
                <div class="resumen-incidencia-info">
                    <span class="resumen-incidencia-id">${incidencia.id} — ${incidencia.tipo}</span>
                    <span class="data-sub">${incidencia.zona} · ${incidencia.fecha}</span>
                </div>
                <span class="estado estado-${claseEstado(incidencia.estado)}">${incidencia.estado}</span>
            </div>
        `)
        .join("");

    detalle.innerHTML = `
        <h3>Últimas incidencias</h3>
        <p>Los ${incidencias.length} reportes más recientes.</p>

        <div class="resumen-incidencias-lista">
            ${filas}
        </div>
    `;
}

//
// Listado (filas de la tabla)
//

function crearFila(modulo, registro) {
    if (modulo === "incidencias") {
        return `
            <button class="data-row" data-id="${registro.id}" type="button">
                <span class="data-id">${registro.id}</span>
                <span>
                    <span class="data-main">${registro.tipo}</span>
                    <span class="data-sub">${registro.zona}</span>
                </span>
                <span class="estado estado-${claseEstado(registro.estado)}">${registro.estado}</span>
                <span class="data-sub">${registro.fecha}</span>
            </button>
        `;
    }

    if (modulo === "contenedores") {
        return `
            <button class="data-row" data-id="${registro.id}" type="button">
                <span class="data-id">${registro.id}</span>
                <span>
                    <span class="data-main">${registro.ubicacion}</span>
                    <span class="data-sub">${registro.capacidad}</span>
                </span>
                <span class="estado estado-${claseEstado(registro.estado)}">${registro.estado}</span>
                <span class="data-sub">${registro.tipoResiduo}</span>
            </button>
        `;
    }

    if (modulo === "camiones") {
        return `
            <button class="data-row" data-id="${registro.id}" type="button">
                <span class="data-id">${registro.id}</span>
                <span>
                    <span class="data-main">${registro.marca} ${registro.modelo}</span>
                    <span class="data-sub">${registro.matricula}</span>
                </span>
                <span class="estado estado-${claseEstado(registro.estado)}">${registro.estado}</span>
                <span class="data-sub">${registro.horario}</span>
            </button>
        `;
    }

    if (modulo === "funcionarios") {
        return `
            <button class="data-row" data-id="${registro.id}" type="button">
                <span class="data-id">${registro.id}</span>
                <span>
                    <span class="data-main">${registro.nombre} ${registro.apellido}</span>
                    <span class="data-sub">${registro.rol}</span>
                </span>
                <span class="estado estado-${claseEstado(registro.estado)}">${registro.estado}</span>
                <span class="data-sub">${registro.zona}</span>
            </button>
        `;
    }
}

// Pinta la lista y devuelve el elemento contenedor (el controlador
// se encarga de escuchar los clicks sobre las filas).
export function renderListaRegistros(modulo, registros) {
    const lista = document.getElementById("moduleList");

    if (registros.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                No se encontraron registros con los filtros aplicados.
            </div>
        `;
        return lista;
    }

    lista.innerHTML = registros.map((registro) => crearFila(modulo, registro)).join("");
    return lista;
}

export function mostrarMensajeSeleccionRegistro() {
    document.getElementById("detailPanel").innerHTML = `
        <p class="detail-empty">
            Seleccione un registro para ver más información.
        </p>
    `;
}

//
// Detalle de un registro
//

function crearAsignacionCamionHtml(registro, choferesDisponibles, rutas) {
    const opcionesChofer = choferesDisponibles
        .map((chofer) => `
            <option value="${chofer.id}" ${registro.choferId === chofer.id ? "selected" : ""}>
                ${chofer.nombre} ${chofer.apellido}
            </option>
        `)
        .join("");

    const opcionesRuta = rutas
        .map((ruta) => `
            <option value="${ruta.id}" ${registro.rutaId === ruta.id ? "selected" : ""}>
                ${ruta.id} — ${ruta.zona} (${ruta.frecuencia})
            </option>
        `)
        .join("");

    return `
        <div class="detail-asignacion">
            <h4>Asignación de chofer y ruta</h4>

            <div class="grupo-formulario">
                <label for="asignarChofer-${registro.id}">Chofer asignado</label>
                <select id="asignarChofer-${registro.id}">
                    <option value="">Sin chofer asignado</option>
                    ${opcionesChofer}
                </select>
            </div>

            <div class="grupo-formulario">
                <label for="asignarRuta-${registro.id}">Ruta de recolección</label>
                <select id="asignarRuta-${registro.id}">
                    <option value="">Sin ruta asignada</option>
                    ${opcionesRuta}
                </select>
            </div>

            <button type="button" class="btn-secundario btn-ancho" data-guardar-asignacion="${registro.id}">
                Guardar asignación
            </button>
        </div>
    `;
}

// Botones de acción del panel de detalle: Editar (todos los módulos con
// registros propios) y, salvo para incidencias (que no maneja el concepto de
// "baja"), Dar de baja / Reactivar.
function crearAccionesHtml(modulo, registro) {
    let botones = `
        <button type="button" class="btn-secundario btn-ancho" data-editar="${registro.id}">
            Editar
        </button>
    `;

    if (modulo !== "incidencias") {
        const esBaja = registro.estado === "baja";
        const accion = esBaja ? "reactivar" : "baja";
        const texto = esBaja ? "Reactivar" : "Dar de baja";
        const clase = esBaja ? "btn-secundario" : "btn-peligro";

        botones += `
            <button type="button" class="${clase} btn-ancho" data-accion="${accion}" data-id="${registro.id}">
                ${texto}
            </button>
        `;
    }

    return `<div class="detail-actions">${botones}</div>`;
}

// datosExtra: { nombreChofer, nombreRuta, choferesDisponibles, rutas } — solo se
// usan cuando modulo === "camiones"; el controlador es quien los pide al modelo.
export function renderDetalle(modulo, registro, datosExtra = {}) {
    const detalle = document.getElementById("detailPanel");

    if (modulo === "incidencias") {
        detalle.innerHTML = `
            <h3>${registro.id}</h3>
            <p>${registro.descripcion}</p>

            <div class="detail-grid">
                ${crearDetalleItem("Tipo", registro.tipo)}
                ${crearDetalleItem("Estado", registro.estado)}
                ${crearDetalleItem("Zona", registro.zona)}
                ${crearDetalleItem("Fecha de reporte", registro.fecha)}
                ${crearDetalleItem("Contenedor asociado", registro.contenedor)}
            </div>

            ${crearAccionesHtml(modulo, registro)}
        `;
    }

    if (modulo === "contenedores") {
        detalle.innerHTML = `
            <h3>${registro.id}</h3>
            <p>${registro.ubicacion}</p>

            <div class="detail-grid">
                ${crearDetalleItem("Estado", registro.estado)}
                ${crearDetalleItem("Capacidad", registro.capacidad)}
                ${crearDetalleItem("Tipo de residuo", registro.tipoResiduo)}
                ${crearDetalleItem("Incidencias asociadas", registro.incidencias)}
            </div>

            ${crearAccionesHtml(modulo, registro)}
        `;
    }

    if (modulo === "camiones") {
        detalle.innerHTML = `
            <h3>${registro.marca} ${registro.modelo}</h3>
            <p>Matrícula ${registro.matricula} — Año ${registro.anio}</p>

            <div class="detail-grid">
                ${crearDetalleItem("Disponibilidad", registro.estado)}
                ${crearDetalleItem("Mantenimiento", registro.mantenimiento)}
                ${crearDetalleItem("Capacidad", registro.capacidad)}
                ${crearDetalleItem("Horario de recolección", registro.horario)}
                ${crearDetalleItem("Chofer asignado", datosExtra.nombreChofer)}
                ${crearDetalleItem("Ruta asignada", datosExtra.nombreRuta)}
            </div>

            ${crearAsignacionCamionHtml(registro, datosExtra.choferesDisponibles, datosExtra.rutas)}

            ${crearAccionesHtml(modulo, registro)}
        `;
    }

    if (modulo === "funcionarios") {
        detalle.innerHTML = `
            <h3>${registro.nombre} ${registro.apellido}</h3>
            <p>${registro.rol}</p>

            <div class="detail-grid">
                ${crearDetalleItem("Cédula", registro.cedula)}
                ${crearDetalleItem("Fecha de nacimiento", registro.fechaNacimiento)}
                ${crearDetalleItem("Teléfono", registro.telefono)}
                ${crearDetalleItem("Dirección", registro.direccion)}
                ${crearDetalleItem("Correo", registro.email)}
                ${crearDetalleItem("Rol", registro.rol)}
                ${crearDetalleItem("Zona / instalación asignada", registro.zona)}
                ${crearDetalleItem("Estado", registro.estado)}
            </div>

            ${crearAccionesHtml(modulo, registro)}
        `;
    }

    return detalle;
}

//
// Modal de alta
//

// modo: "alta" | "editar". valoresIniciales: registro existente cuando se
// edita (para precargar los campos); se ignora en alta.
export function renderCamposFormulario(config, modo = "alta", valoresIniciales = {}) {
    document.getElementById("modalTitulo").textContent =
        modo === "editar" ? config.tituloEdicion : config.titulo;

    const camposHtml = config.campos.map((campo) => {
        const claseAncho = campo.ancho === "completo" ? "grupo-formulario-completo" : "";
        const valorInicial = modo === "editar" ? (valoresIniciales[campo.nombre] ?? "") : "";

        if (campo.tipo === "select") {
            const opciones = campo.opciones
                .map((opcion) => `<option value="${opcion}" ${opcion === valorInicial ? "selected" : ""}>${opcion}</option>`)
                .join("");

            return `
                <div class="grupo-formulario ${claseAncho}">
                    <label for="campo-${campo.nombre}">${campo.etiqueta}</label>
                    <select id="campo-${campo.nombre}" name="${campo.nombre}" ${campo.requerido ? "required" : ""}>
                        ${opciones}
                    </select>
                </div>
            `;
        }

        if (campo.tipo === "textarea") {
            return `
                <div class="grupo-formulario ${claseAncho}">
                    <label for="campo-${campo.nombre}">${campo.etiqueta}</label>
                    <textarea id="campo-${campo.nombre}" name="${campo.nombre}" rows="3" placeholder="${campo.placeholder || ""}" ${campo.requerido ? "required" : ""}>${valorInicial}</textarea>
                </div>
            `;
        }

        return `
            <div class="grupo-formulario ${claseAncho}">
                <label for="campo-${campo.nombre}">${campo.etiqueta}</label>
                <input type="${campo.tipo}" id="campo-${campo.nombre}" name="${campo.nombre}" value="${valorInicial}" placeholder="${campo.placeholder || ""}" ${campo.requerido ? "required" : ""}>
            </div>
        `;
    }).join("");

    document.getElementById("modalFormFields").innerHTML = camposHtml;
}

export function abrirModal() {
    document.getElementById("formModal").classList.remove("oculto");
}

export function cerrarModal() {
    document.getElementById("formModal").classList.add("oculto");
    document.getElementById("formAlta").reset();
}

export function mostrarAccesoNoAutorizado() {
    document.body.innerHTML = `
        <main class="admin-main">
            <section class="module-header">
                <h2>Acceso no autorizado</h2>
                <p>No tiene permisos para ingresar al panel administrador.</p>
                <a href="index.html" class="btn-principal">Volver al inicio</a>
            </section>
        </main>
    `;
}
