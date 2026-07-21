//
// PUNTO DE ENTRADA del panel administrador.
// Solo arranca el controlador. Al ser un script type="module", el
// navegador ya espera a que el HTML esté parseado antes de ejecutarlo,
// así que no hace falta envolver esto en un DOMContentLoaded.
//

import { initAdmin } from "./controller.js";

initAdmin();
