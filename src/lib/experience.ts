const FOUNDING_YEAR = 2019;

export const getYearsOfExperience = () => new Date().getFullYear() - FOUNDING_YEAR;

// Cantidad de carpetas de proyecto en el disco local del equipo. No se puede calcular
// en el navegador: actualizar a mano cuando cambie la cantidad de proyectos entregados.
export const PROJECTS_DELIVERED = 21;
