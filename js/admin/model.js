//
// MODELO
// Datos del panel administrador (simulados, en memoria) y operaciones
// sobre esos datos. Nada de lo que hay en este archivo toca el DOM:
// solo guarda información y sabe leerla/modificarla.
//
// Cuando el backend (API de Usuarios / API de Gestión / API de Recolección)
// esté listo, este es el único archivo que debería cambiar: las funciones
// de abajo pasarían a hacer fetch() en vez de leer/escribir el objeto `datos`.
//

export const usuarioActual = {
    nombre: "Administrador Demo",
    rol: "administrador"
};

export const datos = {
    incidencias: [
        {
            id: "INC-001",
            tipo: "Contenedor desbordado",
            estado: "abierta",
            zona: "Pocitos",
            fecha: "10/07/2026",
            descripcion: "El contenedor se encuentra lleno y con residuos fuera del área.",
            contenedor: "CONT-001"
        },
        {
            id: "INC-002",
            tipo: "Contenedor roto",
            estado: "en curso",
            zona: "Cordón",
            fecha: "11/07/2026",
            descripcion: "La tapa del contenedor está dañada y dificulta su uso.",
            contenedor: "CONT-002"
        },
        {
            id: "INC-003",
            tipo: "Residuo fuera de contenedor",
            estado: "resuelta",
            zona: "Centro",
            fecha: "12/07/2026",
            descripcion: "Se reportaron residuos acumulados fuera del contenedor.",
            contenedor: "CONT-003"
        }
    ],

    contenedores: [
        {
            id: "CONT-001",
            estado: "desbordado",
            ubicacion: "Av. Brasil y Bulevar España",
            capacidad: "1100 litros",
            tipoResiduo: "Residuos mezclados",
            incidencias: "INC-001"
        },
        {
            id: "CONT-002",
            estado: "roto",
            ubicacion: "18 de Julio y Gaboto",
            capacidad: "900 litros",
            tipoResiduo: "Residuos reciclables",
            incidencias: "INC-002"
        },
        {
            id: "CONT-003",
            estado: "funcional",
            ubicacion: "Plaza Independencia",
            capacidad: "1100 litros",
            tipoResiduo: "Residuos mezclados",
            incidencias: "Sin incidencias abiertas"
        }
    ],

    camiones: [
        {
            id: "CAM-001",
            matricula: "SBC 1234",
            marca: "Mercedes-Benz",
            modelo: "Actros 2729",
            anio: "2019",
            estado: "disponible",
            mantenimiento: "Sin mantenimiento pendiente",
            capacidad: "8 toneladas",
            horario: "08:00 a 14:00",
            choferId: "FUN-004",
            rutaId: "RUTA-001"
        },
        {
            id: "CAM-002",
            matricula: "SBD 5678",
            marca: "Volkswagen",
            modelo: "Constellation 24.280",
            anio: "2021",
            estado: "asignado",
            mantenimiento: "Revisión programada",
            capacidad: "10 toneladas",
            horario: "14:00 a 20:00",
            choferId: "FUN-002",
            rutaId: "RUTA-002"
        },
        {
            id: "CAM-003",
            matricula: "SBE 9012",
            marca: "Iveco",
            modelo: "Tector 170",
            anio: "2017",
            estado: "mantenimiento",
            mantenimiento: "Cambio de frenos",
            capacidad: "8 toneladas",
            horario: "No asignado",
            choferId: "",
            rutaId: ""
        }
    ],

    rutas: [
        {
            id: "RUTA-001",
            zona: "Pocitos",
            frecuencia: "Diaria",
            recorrido: "Av. Brasil - Bulevar España - Rambla"
        },
        {
            id: "RUTA-002",
            zona: "Cordón",
            frecuencia: "Día por medio",
            recorrido: "18 de Julio - Gaboto - Constituyente"
        },
        {
            id: "RUTA-003",
            zona: "Centro",
            frecuencia: "Diaria",
            recorrido: "Plaza Independencia - Ciudad Vieja"
        }
    ],

    funcionarios: [
        {
            id: "FUN-001",
            nombre: "Lucía",
            apellido: "Fernández",
            cedula: "4.111.222-3",
            fechaNacimiento: "1990-04-12",
            telefono: "099 111 222",
            direccion: "Bulevar España 2145",
            email: "responsable@sigeru.uy",
            rol: "Administrador",
            zona: "Pocitos",
            estado: "activo"
        },
        {
            id: "FUN-002",
            nombre: "Martín",
            apellido: "Silva",
            cedula: "3.222.333-4",
            fechaNacimiento: "1987-09-03",
            telefono: "098 222 333",
            direccion: "Gaboto 1522",
            email: "mantenimiento@sigeru.uy",
            rol: "Chofer",
            zona: "Cordón",
            estado: "activo"
        },
        {
            id: "FUN-003",
            nombre: "Ana",
            apellido: "Pereyra",
            cedula: "5.333.444-5",
            fechaNacimiento: "1995-01-20",
            telefono: "097 333 444",
            direccion: "Colonia 987",
            email: "operaciones@sigeru.uy",
            rol: "Operario de vertedero",
            zona: "Centro",
            estado: "baja"
        },
        {
            id: "FUN-004",
            nombre: "Diego",
            apellido: "Ramírez",
            cedula: "6.444.555-6",
            fechaNacimiento: "1992-11-08",
            telefono: "096 444 555",
            direccion: "Rivera 3320",
            email: "chofer2@sigeru.uy",
            rol: "Chofer",
            zona: "Pocitos",
            estado: "activo"
        }
    ]
};

// Config de cada módulo (título, descripción, estados posibles).
export const configuracionModulos = {
    resumen: {
        titulo: "Resumen general",
        descripcion: "Vista inicial del estado general del sistema.",
        estados: []
    },
    incidencias: {
        titulo: "Incidencias reportadas",
        descripcion: "Listado de reportes realizados por usuarios del sistema.",
        estados: ["abierta", "en curso", "resuelta"]
    },
    contenedores: {
        titulo: "Contenedores",
        descripcion: "Listado de contenedores con estado y ubicación.",
        estados: ["funcional", "roto", "desbordado", "baja"]
    },
    camiones: {
        titulo: "Camiones",
        descripcion: "Listado de camiones con estado operativo.",
        estados: ["disponible", "asignado", "mantenimiento", "baja"]
    },
    funcionarios: {
        titulo: "Funcionarios",
        descripcion: "Alta y baja de trabajadores con acceso al sistema.",
        estados: ["activo", "baja"]
    }
};

// Config de los formularios de alta (qué campos pedir por módulo).
export const formulariosAlta = {
    contenedores: {
        titulo: "Nuevo contenedor",
        tituloEdicion: "Editar contenedor",
        prefijoId: "CONT",
        campos: [
            { nombre: "ubicacion", etiqueta: "Ubicación", tipo: "text", requerido: true, ancho: "completo", placeholder: "Ej: Av. Brasil y Bulevar España" },
            { nombre: "capacidad", etiqueta: "Capacidad", tipo: "text", requerido: true, placeholder: "Ej: 1100 litros" },
            { nombre: "tipoResiduo", etiqueta: "Tipo de residuo", tipo: "select", requerido: true, opciones: ["Residuos mezclados", "Residuos reciclables", "Residuos orgánicos"] },
            { nombre: "estado", etiqueta: "Estado inicial", tipo: "select", requerido: true, opciones: ["funcional", "roto", "desbordado"] }
        ]
    },
    camiones: {
        titulo: "Nuevo camión",
        tituloEdicion: "Editar camión",
        prefijoId: "CAM",
        campos: [
            { nombre: "matricula", etiqueta: "Matrícula", tipo: "text", requerido: true, placeholder: "Ej: SBC 1234" },
            { nombre: "marca", etiqueta: "Marca", tipo: "text", requerido: true, placeholder: "Ej: Mercedes-Benz" },
            { nombre: "modelo", etiqueta: "Modelo", tipo: "text", requerido: true, placeholder: "Ej: Actros 2729" },
            { nombre: "anio", etiqueta: "Año", tipo: "number", requerido: true, placeholder: "Ej: 2019" },
            { nombre: "capacidad", etiqueta: "Capacidad", tipo: "text", requerido: true, placeholder: "Ej: 8 toneladas" },
            { nombre: "horario", etiqueta: "Horario de recolección", tipo: "text", requerido: true, placeholder: "Ej: 08:00 a 14:00" },
            { nombre: "mantenimiento", etiqueta: "Mantenimiento", tipo: "text", requerido: false, placeholder: "Ej: Sin mantenimiento pendiente" },
            { nombre: "estado", etiqueta: "Disponibilidad", tipo: "select", requerido: true, opciones: ["disponible", "asignado", "mantenimiento"] }
        ]
    },
    funcionarios: {
        titulo: "Nuevo funcionario",
        tituloEdicion: "Editar funcionario",
        prefijoId: "FUN",
        campos: [
            { nombre: "nombre", etiqueta: "Nombres", tipo: "text", requerido: true },
            { nombre: "apellido", etiqueta: "Apellidos", tipo: "text", requerido: true },
            { nombre: "cedula", etiqueta: "Cédula", tipo: "text", requerido: true, placeholder: "Ej: 4.123.456-7" },
            { nombre: "fechaNacimiento", etiqueta: "Fecha de nacimiento", tipo: "date", requerido: true },
            { nombre: "telefono", etiqueta: "Teléfono", tipo: "tel", requerido: true, placeholder: "Ej: 099 123 456" },
            { nombre: "direccion", etiqueta: "Dirección", tipo: "text", requerido: true, ancho: "completo", placeholder: "Ej: Calle 18 de Julio 1234" },
            { nombre: "email", etiqueta: "Correo electrónico", tipo: "email", requerido: true },
            { nombre: "rol", etiqueta: "Rol", tipo: "select", requerido: true, opciones: ["Chofer", "Funcionario de cuadrilla", "Operario de vertedero", "Operario de centro de acopio", "Administrador"] },
            { nombre: "zona", etiqueta: "Zona o instalación asignada", tipo: "text", requerido: true }
        ]
    }
};

// Config de edición de incidencias. Incidencias no tiene alta desde el panel
// (las genera el vecino directo desde el formulario de la landing), por eso
// vive aparte de formulariosAlta. Y como el vecino ya cargó el resto de los
// datos, lo único que el administrador puede tocar acá es la resolución del
// caso (abierta / en curso / resuelta).
export const configEdicionIncidencias = {
    tituloEdicion: "Actualizar resolución de la incidencia",
    campos: [
        { nombre: "estado", etiqueta: "Resolución", tipo: "select", requerido: true, opciones: ["abierta", "en curso", "resuelta"] }
    ]
};

// Devuelve la config de campos a usar para editar un registro de un módulo,
// sea que tenga alta desde el panel (contenedores, camiones, funcionarios) o no
// (incidencias).
export function obtenerConfigEdicion(modulo) {
    if (modulo === "incidencias") return configEdicionIncidencias;
    return formulariosAlta[modulo] || null;
}

export function normalizarTexto(texto) {
    return texto.toString().toLowerCase();
}

export function obtenerRegistros(modulo) {
    return datos[modulo];
}

export function obtenerRegistroPorId(modulo, id) {
    return datos[modulo].find((item) => item.id === id);
}

export function filtrarRegistros(modulo, textoBusqueda, estadoSeleccionado) {
    const texto = normalizarTexto(textoBusqueda);

    return datos[modulo].filter((registro) => {
        const coincideEstado = estadoSeleccionado === "todos" || registro.estado === estadoSeleccionado;

        const textoRegistro = normalizarTexto(Object.values(registro).join(" "));
        const coincideBusqueda = textoRegistro.includes(texto);

        return coincideEstado && coincideBusqueda;
    });
}

export function contarIncidenciasAbiertas() {
    return datos.incidencias.filter((incidencia) => incidencia.estado === "abierta").length;
}

export function contarFuncionariosActivos() {
    return datos.funcionarios.filter((funcionario) => funcionario.estado === "activo").length;
}

//
// Camiones: asignación de chofer y ruta (relación chofer-camión 1 a 1)
//

export function obtenerNombreChofer(choferId) {
    const chofer = datos.funcionarios.find((funcionario) => funcionario.id === choferId);
    return chofer ? `${chofer.nombre} ${chofer.apellido}` : "Sin chofer asignado";
}

export function obtenerNombreRuta(rutaId) {
    const ruta = datos.rutas.find((item) => item.id === rutaId);
    return ruta ? `${ruta.id} — ${ruta.zona} (${ruta.frecuencia})` : "Sin ruta asignada";
}

export function obtenerChoferesDisponibles() {
    return datos.funcionarios.filter(
        (funcionario) => funcionario.rol === "Chofer" && funcionario.estado === "activo"
    );
}

export function obtenerRutas() {
    return datos.rutas;
}

export function asignarCamion(idCamion, choferId, rutaId) {
    // un chofer no puede estar en dos camiones a la vez (relación 1 a 1)
    if (choferId) {
        datos.camiones.forEach((camion) => {
            if (camion.id !== idCamion && camion.choferId === choferId) {
                camion.choferId = "";
            }
        });
    }

    const camion = datos.camiones.find((item) => item.id === idCamion);
    if (!camion) return null;

    camion.choferId = choferId;
    camion.rutaId = rutaId;

    return camion;
}

//
// Alta y baja de registros
//

export function generarId(modulo, prefijo) {
    const numeros = datos[modulo]
        .map((item) => parseInt(item.id.split("-")[1], 10))
        .filter((numero) => !isNaN(numero));

    const siguiente = numeros.length ? Math.max(...numeros) + 1 : 1;
    return `${prefijo}-${String(siguiente).padStart(3, "0")}`;
}

export function alternarBaja(modulo, id) {
    const registro = obtenerRegistroPorId(modulo, id);
    if (!registro) return null;

    if (registro.estado === "baja") {
        registro.estado = registro.estadoAnterior || configuracionModulos[modulo].estados[0];
        delete registro.estadoAnterior;
    } else {
        registro.estadoAnterior = registro.estado;
        registro.estado = "baja";
    }

    return registro;
}

// valoresCampos: objeto plano { nombreCampo: valor, ... } ya extraído del formulario
export function crearRegistro(modulo, valoresCampos) {
    const config = formulariosAlta[modulo];
    if (!config) return null;

    const nuevoRegistro = { id: generarId(modulo, config.prefijoId) };

    config.campos.forEach((campo) => {
        nuevoRegistro[campo.nombre] = valoresCampos[campo.nombre];
    });

    if (modulo === "contenedores") {
        nuevoRegistro.incidencias = "Sin incidencias abiertas";
    }

    if (modulo === "funcionarios") {
        nuevoRegistro.estado = "activo";
    }

    datos[modulo].push(nuevoRegistro);

    return nuevoRegistro;
}

// Edita un registro existente: sobrescribe solo los campos definidos en la
// config de edición del módulo (id, y en el caso de camiones choferId/rutaId,
// quedan intactos porque no forman parte de esos campos).
export function editarRegistro(modulo, id, valoresCampos) {
    const registro = obtenerRegistroPorId(modulo, id);
    if (!registro) return null;

    const config = obtenerConfigEdicion(modulo);
    if (!config) return null;

    config.campos.forEach((campo) => {
        registro[campo.nombre] = valoresCampos[campo.nombre];
    });

    return registro;
}

//
// Resumen
//

// Últimas incidencias reportadas (las más nuevas primero), para el panel de
// Resumen. Se asume que los registros más nuevos quedan al final del array
// (así es como crearRegistro los agrega).
export function obtenerUltimasIncidencias(cantidad = 5) {
    return datos.incidencias.slice(-cantidad).reverse();
}
