document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================
    // 1. STICKY HEADER & ACTIVE PAGE HIGHLIGHT (MPA)
    // ==========================================
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active page highlight based on URL path
    const path = window.location.pathname;
    const pageName = path.split("/").pop() || "index.html";

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Highlight logic
        if (href === pageName || 
            (pageName === "index.html" && href === "index.html") || 
            (pageName === "" && href === "index.html")) {
            link.classList.add('active');
        }
    });

    // ==========================================
    // 2. MOBILE MENU TOGGLE
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            mobileToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });
    }

    // ==========================================
    // 3. COURSE TABS INTERACTION (cursos.html)
    // ==========================================
    const tabPreu = document.getElementById('tab-preu');
    const tabUniv = document.getElementById('tab-univ');
    const panelPreu = document.getElementById('panel-preu');
    const panelUniv = document.getElementById('panel-univ');

    if (tabPreu && tabUniv) {
        tabPreu.addEventListener('click', () => {
            tabPreu.classList.add('active');
            tabPreu.setAttribute('aria-selected', 'true');
            tabUniv.classList.remove('active');
            tabUniv.setAttribute('aria-selected', 'false');

            panelPreu.classList.add('active');
            panelUniv.classList.remove('active');
        });

        tabUniv.addEventListener('click', () => {
            tabUniv.classList.add('active');
            tabUniv.setAttribute('aria-selected', 'true');
            tabPreu.classList.remove('active');
            tabPreu.setAttribute('aria-selected', 'false');

            panelUniv.classList.add('active');
            panelPreu.classList.remove('active');
        });
    }

    // ==========================================
    // 4. FULL INSTITUTIONS DATABASE (33 U & 54 IST)
    // ==========================================
    const universidadesData = [
        // 33 UNIVERSIDADES
        { siglas: "UCE", name: "Universidad Central del Ecuador", location: "Quito, Pichincha", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Examen propio presencial centrado en aptitudes y razonamientos clave.", status: "Exámenes: Septiembre", link: "https://admision.uce.edu.ec", nextDate: "2026-07-18", nextEventLabel: "Inscripciones: 18 de Julio" },
        { siglas: "EPN", name: "Escuela Politécnica Nacional", location: "Quito, Pichincha", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Evaluación propia presencial de alta exigencia matemática, física y lógica.", status: "Exámenes: Agosto", link: "https://admisiones.epn.edu.ec", nextDate: "2026-08-10", nextEventLabel: "Examen: 10 de Agosto" },
        { siglas: "UArtes", name: "Universidad de las Artes", location: "Guayaquil, Guayas", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Pruebas presenciales de destrezas artísticas y evaluación de portafolio.", status: "Pruebas: Agosto", link: "https://admisiones.uartes.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Pruebas: 5 de Agosto" },
        { siglas: "UTM", name: "Universidad Técnica de Manabí", location: "Portoviejo, Manabí", process: "propio", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Examen en línea a través de campus virtual con estrictas medidas de validación.", status: "Exámenes: Agosto", link: "https://admision.utm.edu.ec", nextDate: "2026-08-14", nextEventLabel: "Examen: 14 de Agosto" },
        { siglas: "YACHAY", name: "Universidad Yachay Tech", location: "Urcuquí, Imbabura", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Evaluación de conocimientos científicos avanzados en campus.", status: "Exámenes: Septiembre", link: "https://yachaytech.edu.ec", nextDate: "2026-08-20", nextEventLabel: "Examen: 20 de Agosto" },
        { siglas: "ESPOL", name: "Escuela Superior Politécnica del Litoral", location: "Guayaquil, Guayas", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Examen presencial de aptitudes académicas y conocimientos técnicos.", status: "Exámenes: Julio-Agosto", link: "https://www.espol.edu.ec", nextDate: "2026-07-25", nextEventLabel: "Examen: 25 de Julio" },
        { siglas: "UTA", name: "Universidad Técnica de Ambato", location: "Ambato, Tungurahua", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Examen de razonamiento y conocimientos presencial en campus universitario.", status: "Exámenes: Agosto", link: "https://www.uta.edu.ec", nextDate: "2026-08-12", nextEventLabel: "Examen: 12 de Agosto" },
        { siglas: "UG", name: "Universidad de Guayaquil", location: "Guayaquil, Guayas", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Inscripciones del 13 al 20 de julio y evaluaciones presenciales en septiembre.", status: "Exámenes: Septiembre", link: "http://www.ug.edu.ec", nextDate: "2026-07-13", nextEventLabel: "Inscripciones: 13 al 20 de Julio" },
        { siglas: "UTB", name: "Universidad Técnica de Babahoyo", location: "Babahoyo, Los Ríos", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Pruebas presenciales de conocimientos generales y razonamiento.", status: "Exámenes: Septiembre", link: "http://www.utb.edu.ec", nextDate: "2026-09-02", nextEventLabel: "Examen: 2 de Septiembre" },
        { siglas: "UNAE", name: "Universidad Nacional de Educación", location: "Azogues, Cañar", process: "propio", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Examen mixto con foco en aptitud docente, pedagogía y lógica.", status: "Exámenes: Septiembre", link: "https://www.unae.edu.ec", nextDate: "2026-09-15", nextEventLabel: "Examen: 15 de Septiembre" },
        { siglas: "ESPAM", name: "Espam Manuel Félix López", location: "Calceta, Manabí", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Evaluación de conocimientos agropecuarios y ciencias básicas.", status: "Exámenes: Septiembre", link: "http://www.espam.edu.ec", nextDate: "2026-09-04", nextEventLabel: "Examen: 4 de Septiembre" },
        { siglas: "ESPE", name: "Universidad de las Fuerzas Armadas", location: "Sangolquí, Pichincha", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Examen de conocimientos y razonamientos presencial.", status: "Exámenes: Agosto", link: "https://www.espe.edu.ec", nextDate: "2026-08-07", nextEventLabel: "Examen: 7 de Agosto" },
        { siglas: "UNACH", name: "Universidad Nacional de Chimborazo", location: "Riobamba, Chimborazo", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Examen propio de aptitudes académicas presencial en campus.", status: "Exámenes: Agosto", link: "https://www.unach.edu.ec", nextDate: "2026-08-08", nextEventLabel: "Examen: 8 de Agosto" },
        { siglas: "UCUENCA", name: "Universidad de Cuenca", location: "Cuenca, Azuay", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Examen presencial de conocimientos específicos y razonamientos generales.", status: "Exámenes: 29-30 Julio", link: "https://www.ucuenca.edu.ec", nextDate: "2026-07-29", nextEventLabel: "Examen: 29 de Julio" },
        { siglas: "UPSE", name: "Universidad Estatal Península de Santa Elena", location: "La Libertad, Santa Elena", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Examen presencial de aptitudes generales exigido para el ingreso.", status: "Exámenes: Septiembre", link: "https://www.upse.edu.ec", nextDate: "2026-09-26", nextEventLabel: "Examen: 26 de Septiembre" },
        { siglas: "UNL", name: "Universidad Nacional de Loja", location: "Loja, Loja", process: "propio", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Proceso de selección mixto combinando lógica verbal, abstracta y numérica.", status: "Exámenes: Septiembre", link: "https://unl.edu.ec", nextDate: "2026-09-18", nextEventLabel: "Examen: 18 de Septiembre" },
        { siglas: "ULEAM", name: "Universidad Laica Eloy Alfaro de Manabí", location: "Manta, Manabí", process: "propio", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Evaluación propia con modalidades mixtas según la facultad.", status: "Exámenes: Septiembre", link: "https://www.uleam.edu.ec", nextDate: "2026-09-14", nextEventLabel: "Examen: 14 de Septiembre" },
        { siglas: "ESPOCH", name: "Escuela Superior Politécnica de Chimborazo", location: "Riobamba, Chimborazo", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Evaluación técnica de conocimientos y aptitudes generales de forma presencial.", status: "Exámenes: Septiembre", link: "https://www.espoch.edu.ec", nextDate: "2026-09-03", nextEventLabel: "Examen: 3 de Septiembre" },
        { siglas: "UTN", name: "Universidad Técnica del Norte", location: "Ibarra, Imbabura", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Examen propio presencial enfocado en razonamiento matemático y verbal.", status: "Exámenes: Septiembre", link: "https://www.utn.edu.ec", nextDate: "2026-09-12", nextEventLabel: "Examen: 12 de Septiembre" },
        { siglas: "UPEC", name: "Universidad Politécnica Estatal del Carchi", location: "Tulcán, Carchi", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Examen propio de aptitudes para el ingreso, presencial y enfocado en razonamientos.", status: "Exámenes: Agosto", link: "https://www.upec.edu.ec", nextDate: "2026-08-18", nextEventLabel: "Examen: 18 de Agosto" },
        { siglas: "IKIAM", name: "Universidad Regional Amazónica Ikiam", location: "Tena, Napo", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Evaluación presencial con fuerte énfasis en Ciencias de la Vida.", status: "Exámenes: Septiembre", link: "https://www.ikiam.edu.ec", nextDate: "2026-09-08", nextEventLabel: "Examen: 8 de Septiembre" },
        { siglas: "UTLVTE", name: "Universidad Técnica Luis Vargas Torres", location: "Esmeraldas, Esmeraldas", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Examen presencial de razonamientos y aptitudes básicas.", status: "Exámenes: Septiembre", link: "http://www.utelvt.edu.ec", nextDate: "2026-09-06", nextEventLabel: "Examen: 6 de Septiembre" },
        { siglas: "UAW", name: "Universidad Intercultural Amawtay Wasi", location: "Quito, Pichincha", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Examen asistido de SENESCYT con enfoque de desarrollo comunitario e intercultural.", status: "Evaluación: Agosto", link: "https://sigu.uaw.edu.ec", nextDate: "2026-08-22", nextEventLabel: "Evaluación: 22 de Agosto" },
        { siglas: "UTC", name: "Universidad Técnica de Cotopaxi", location: "Latacunga, Cotopaxi", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Examen de aptitud lógica presencial obligatorio en las sedes de la universidad.", status: "Exámenes: Septiembre", link: "https://admision.utc.edu.ec", nextDate: "2026-09-24", nextEventLabel: "Examen: 24 de Septiembre" },
        { siglas: "UAE", name: "Universidad Agraria del Ecuador", location: "Guayaquil, Guayas", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Examen de admisión presencial para carreras agronómicas y veterinarias.", status: "Exámenes: Septiembre", link: "http://www.uagraria.edu.ec", nextDate: "2026-09-11", nextEventLabel: "Examen: 11 de Septiembre" },
        { siglas: "UNEMI", name: "Universidad Estatal de Milagro", location: "Milagro, Guayas", process: "propio", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Evaluación mixta dependiendo de la carrera (presencial u online con control).", status: "Exámenes: Septiembre", link: "https://www.unemi.edu.ec", nextDate: "2026-09-10", nextEventLabel: "Examen: 10 de Septiembre" },
        { siglas: "UNESUM", name: "Universidad Estatal del Sur de Manabí", location: "Jipijapa, Manabí", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Evaluación presencial de razonamientos y aptitud vocacional.", status: "Exámenes: Septiembre", link: "http://unesum.edu.ec", nextDate: "2026-09-13", nextEventLabel: "Examen: 13 de Septiembre" },
        { siglas: "USECIPOL", name: "U. de Seguridad Ciudadana y Ciencias Policiales", location: "Quito, Pichincha", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Evaluación presencial de conocimientos en ciencias policiales y razonamiento.", status: "Exámenes: Agosto", link: "https://usecipol.edu.ec", nextDate: "2026-08-28", nextEventLabel: "Examen: 28 de Agosto" },
        { siglas: "UTMACH", name: "Universidad Técnica de Machala", location: "Machala, El Oro", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Evaluación presencial de aptitudes académicas en campus.", status: "Exámenes: Septiembre", link: "http://www.utmachala.edu.ec", nextDate: "2026-09-16", nextEventLabel: "Examen: 16 de Septiembre" },
        { siglas: "UTEQ", name: "Universidad Técnica Estatal de Quevedo", location: "Quevedo, Los Ríos", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Examen de conocimientos y aptitudes presencial regulado por admisiones.", status: "Exámenes: Septiembre", link: "https://www.uteq.edu.ec", nextDate: "2026-09-20", nextEventLabel: "Examen: 20 de Septiembre" },
        { siglas: "UEA", name: "Universidad Estatal Amazónica", location: "Puyo, Pastaza", process: "propio", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Evaluación con control de identidad biométrica en línea y presencial.", status: "Exámenes: Septiembre", link: "https://www.uea.edu.ec", nextDate: "2026-09-22", nextEventLabel: "Examen: 22 de Septiembre" },
        { siglas: "UPSDT", name: "Universidad de Santo Domingo de los Tsáchilas", location: "Santo Domingo", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Pruebas de admisión en campus para nuevas carreras públicas.", status: "Exámenes: Septiembre", link: "https://upsdt.edu.ec", nextDate: "2026-09-25", nextEventLabel: "Examen: 25 de Septiembre" },
        { siglas: "UEB", name: "Universidad Estatal de Bolívar", location: "Guaranda, Bolívar", process: "propio", evalType: "presencial", evalLabel: "Presencial", desc: "Examen propio presencial de aptitudes académicas.", status: "Exámenes: Septiembre", link: "http://ueb.edu.ec", nextDate: "2026-09-27", nextEventLabel: "Examen: 27 de Septiembre" },

        // 54 INSTITUTOS (Procesos Asistidos por defecto)
        { siglas: "CSJMR", name: "Conservatorio Superior José María Rodríguez", location: "Cuenca, Azuay", process: "asistido", evalType: "presencial", evalLabel: "Presencial", desc: "Conservatorio público con proceso de admisión asistido por SENESCYT.", status: "Evaluación: Agosto", link: "https://www.conservatoriosuperiorjosemariarodriguez.com", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "CSNM", name: "Conservatorio Superior Nacional de Música", location: "Quito, Pichincha", process: "asistido", evalType: "presencial", evalLabel: "Presencial", desc: "Evaluación teórica e instrumental en campus.", status: "Evaluación: Agosto", link: "https://www.csnm.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "CSSBC", name: "Conservatorio Superior Salvador Bustamante Celi", location: "Loja, Loja", process: "asistido", evalType: "presencial", evalLabel: "Presencial", desc: "Pruebas instrumentales y de aptitud musical.", status: "Evaluación: Agosto", link: "https://conservatoriosuperiorsbc.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "ISP JRA", name: "ISTP Intercultural Bilingüe Jaime Roldós Aguilera", location: "Colta, Chimborazo", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Instituto bilingüe asistido.", status: "Evaluación: Agosto", link: "http://www.ispedibjra.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "ISP Q", name: "ISTP Intercultural Bilingüe Quilloac", location: "Cañar, Cañar", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Carreras técnicas e interculturales.", status: "Evaluación: Agosto", link: "https://institutoquilloac.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "ISP C", name: "ISTP Intercultural Bilingüe Canelos", location: "Pastaza, Pastaza", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Carreras bilingües de la Amazonía.", status: "Evaluación: Agosto", link: "http://www.institutocanelos.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST 17J", name: "Instituto Superior Tecnológico 17 de Julio", location: "Urcuquí, Imbabura", process: "asistido", evalType: "presencial", evalLabel: "Presencial", desc: "Carreras tecnológicas e industriales asociadas a Yachay.", status: "Evaluación: Agosto", link: "http://www.ist17dejulio.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST AE", name: "Instituto Superior Tecnológico Alberto Enríquez", location: "Atuntaqui, Imbabura", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Carreras en confección y diseño textil.", status: "Evaluación: Agosto", link: "https://istae.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST AM", name: "Instituto Superior Tecnológico Amazónico", location: "Tena, Napo", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Tecnologías ambientales y administrativas.", status: "Evaluación: Agosto", link: "http://www.istam.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST B", name: "Instituto Superior Tecnológico Babahoyo", location: "Babahoyo, Los Ríos", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Educación tecnológica en Los Ríos.", status: "Evaluación: Agosto", link: "http://www.istb.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST BOL", name: "Instituto Superior Tecnológico Bolívar", location: "Ambato, Tungurahua", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Tecnologías en mecánica y administración.", status: "Evaluación: Agosto", link: "http://www.itsbolivar.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST CAR", name: "Instituto Superior Tecnológico Cariamanga", location: "Cariamanga, Loja", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Tecnologías agrícolas y de administración.", status: "Evaluación: Agosto", link: "http://www.institutocariamanga.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST CC", name: "Instituto Superior Tecnológico Carlos Cisneros", location: "Riobamba, Chimborazo", process: "asistido", evalType: "presencial", evalLabel: "Presencial", desc: "Excelente oferta en electromecánica y metalmecánica.", status: "Evaluación: Agosto", link: "http://itscarloscisneros.com.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST CT", name: "Instituto Superior Tecnológico Central Técnico", location: "Quito, Pichincha", process: "asistido", evalType: "presencial", evalLabel: "Presencial", desc: "Uno de los institutos técnicos tradicionales del país.", status: "Evaluación: Agosto", link: "http://www.istct.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST CV", name: "Instituto Superior Tecnológico Ciudad de Valencia", location: "Valencia, Los Ríos", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Carreras agropecuarias y de software.", status: "Evaluación: Agosto", link: "https://istciudaddevalencia.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST COT", name: "Instituto Superior Tecnológico Cotacachi", location: "Cotacachi, Imbabura", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Tecnologías en gastronomía y diseño.", status: "Evaluación: Agosto", link: "http://www.institutocotacachi.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST CX", name: "Instituto Superior Tecnológico Cotopaxi", location: "Latacunga, Cotopaxi", process: "asistido", evalType: "presencial", evalLabel: "Presencial", desc: "Tecnologías industriales e informática.", status: "Evaluación: Agosto", link: "https://isuc.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST DR", name: "Instituto Superior Tecnológico Daniel Reyes", location: "San Antonio de Ibarra, Imbabura", process: "asistido", evalType: "presencial", evalLabel: "Presencial", desc: "Enfoque exclusivo en artes plásticas y diseño gráfico.", status: "Evaluación: Agosto", link: "http://www.istap-danielreyes.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "ISTAE", name: "Instituto Superior Tecnológico de Artes del Ecuador", location: "Guayaquil, Guayas", process: "asistido", evalType: "presencial", evalLabel: "Presencial", desc: "Tecnologías en producción audiovisual y artes visuales.", status: "Evaluación: Agosto", link: "http://www.itae.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST YAV", name: "Instituto Tecnológico Yavirac", location: "Quito, Pichincha", process: "asistido", evalType: "presencial", evalLabel: "Presencial", desc: "Especialidades en gastronomía, turismo y diseño de modas.", status: "Evaluación: Agosto", link: "https://yavirac.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST AUS", name: "Instituto Superior Tecnológico del Austro", location: "Cuenca, Azuay", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Tecnologías en el Austro ecuatoriano.", status: "Evaluación: Agosto", link: "http://www.insteclrg.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST AZU", name: "Instituto Superior Tecnológico del Azuay", location: "Cuenca, Azuay", process: "asistido", evalType: "presencial", evalLabel: "Presencial", desc: "Tecnologías en desarrollo de software, mecatrónica y transporte.", status: "Evaluación: Agosto", link: "https://www.tecazuay.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST LIB", name: "Instituto Superior Tecnológico El Libertador", location: "Guayaquil, Guayas", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Administración y desarrollo de software.", status: "Evaluación: Agosto", link: "https://istel.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST FO", name: "Instituto Superior Tecnológico Francisco de Orellana", location: "Orellana, Orellana", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Carreras del área petrolera e industrial.", status: "Evaluación: Agosto", link: "http://istfo.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST GAL", name: "Instituto Superior Tecnológico Galápagos", location: "San Cristóbal, Galápagos", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Enfocado en turismo de conservación y hotelería.", status: "Evaluación: Agosto", link: "http://www.istgal.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST GEA", name: "Instituto Superior Tecnológico Eloy Alfaro", location: "Esmeraldas", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Tecnologías aplicadas al desarrollo de Esmeraldas.", status: "Evaluación: Agosto", link: "https://www.facebook.com/istgea-102950191949644", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST G", name: "Instituto Superior Tecnológico Guayaquil", location: "Guayaquil, Guayas", process: "asistido", evalType: "presencial", evalLabel: "Presencial", desc: "Amplia oferta técnica industrial y de software.", status: "Evaluación: Agosto", link: "https://istg.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST HUA", name: "Instituto Superior Tecnológico Huaquillas", location: "Huaquillas, El Oro", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Tecnologías en redes y comercio exterior.", status: "Evaluación: Agosto", link: "https://www.isthuaquillas.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST IPP", name: "Instituto Superior Tecnológico Ismael Pérez Pazmiño", location: "Machala, El Oro", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Tecnologías en administración y mecánica.", status: "Evaluación: Agosto", link: "http://www.instipp.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST JBA", name: "Instituto Superior Tecnológico Juan Bautista Aguirre", location: "Daule, Guayas", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Enfocado en biotecnología y redes.", status: "Evaluación: Agosto", link: "http://www.itsjba.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST LM", name: "Instituto Superior Tecnológico La Maná", location: "La Maná, Cotopaxi", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Tecnologías agrícolas e informática.", status: "Evaluación: Agosto", link: "https://istlamana.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST LT", name: "Instituto Superior Tecnológico La Troncal", location: "La Troncal, Cañar", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Carreras técnicas de corta duración.", status: "Evaluación: Agosto", link: "https://www.istlatroncal.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST LIM", name: "Instituto Superior Tecnológico Limón", location: "Limón Indanza, Morona Santiago", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Carreras técnicas en la Amazonía.", status: "Evaluación: Agosto", link: "http://tecnologicolimon.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST LOJ", name: "Instituto Superior Tecnológico Loja", location: "Loja, Loja", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Tecnologías en diseño, turismo y software.", status: "Evaluación: Agosto", link: "http://tecnologicoloja.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST LAM", name: "Instituto Superior Tecnológico Luis Arboleda Martínez", location: "Manta, Manabí", process: "asistido", evalType: "presencial", evalLabel: "Presencial", desc: "Excelente oferta en mecánica industrial y acuicultura.", status: "Evaluación: Agosto", link: "http://www.istlam.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST LT2", name: "Instituto Superior Tecnológico Luis Tello", location: "Esmeraldas, Esmeraldas", process: "asistido", evalType: "presencial", evalLabel: "Presencial", desc: "Mecánica industrial y electricidad.", status: "Evaluación: Agosto", link: "https://insluistello.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST LUT", name: "Instituto Superior Tecnológico Luis Ulpiano de la Torre", location: "Cotacachi, Imbabura", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Música, arte y tecnologías aplicadas.", status: "Evaluación: Agosto", link: "http://www.istluisulpianodelatorre.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST MG", name: "Instituto Superior Tecnológico Manuel Galecio", location: "Alausi, Chimborazo", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Desarrollo infantil y tecnologías administrativas.", status: "Evaluación: Agosto", link: "http://www.itsmg.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST MBR", name: "Instituto Superior Tecnológico Martha Bucaram de Roldós", location: "Lago Agrio, Sucumbíos", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Tecnologías industriales en el oriente ecuatoriano.", status: "Evaluación: Agosto", link: "http://www.istmbr.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST NT", name: "Instituto Superior Tecnológico Nelson Torres", location: "Cayambe, Pichincha", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Tecnologías en desarrollo de software y turismo.", status: "Evaluación: Agosto", link: "http://www.intsuperior.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST 8N", name: "Instituto Superior Tecnológico Ocho de Noviembre", location: "Piñas, El Oro", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Administración de empresas y desarrollo de software.", status: "Evaluación: Agosto", link: "https://www.facebook.com/ist8n", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST PEM", name: "Instituto Superior Tecnológico Paulo Emilio Macías", location: "Portoviejo, Manabí", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Agroecología y desarrollo infantil.", status: "Evaluación: Agosto", link: "http://www.istpem.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST PEL", name: "Instituto Superior Tecnológico Pelileo", location: "Pelileo, Tungurahua", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Enfoque en desarrollo textil y software.", status: "Evaluación: Agosto", link: "http://www.itspelileo.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST QUI", name: "Instituto Superior Tecnológico Quinindé", location: "Quinindé, Esmeraldas", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Tecnologías agrícolas y de software.", status: "Evaluación: Agosto", link: "https://institutoquininde.edu.ec/area-academica/", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST RIO", name: "Instituto Superior Tecnológico Riobamba", location: "Riobamba, Chimborazo", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Administración y desarrollo infantil.", status: "Evaluación: Agosto", link: "http://www.itsriobamba.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST SB", name: "Instituto Superior Tecnológico Simón Bolívar", location: "Guayaquil, Guayas", process: "asistido", evalType: "presencial", evalLabel: "Presencial", desc: "Líder regional en tecnologías automotrices y electromecánica.", status: "Evaluación: Agosto", link: "http://www.itssb.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST SUC", name: "Instituto Superior Tecnológico Sucre", location: "Quito, Pichincha", process: "asistido", evalType: "presencial", evalLabel: "Presencial", desc: "Carreras prácticas en desarrollo de software, electrónica y contabilidad.", status: "Evaluación: Agosto", link: "https://tecnologicosucre.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST SC", name: "Instituto Superior Tecnológico Sucúa", location: "Sucúa, Morona Santiago", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Tecnologías administrativas y ecológicas.", status: "Evaluación: Agosto", link: "http://www.istsucua.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST TENA", name: "Instituto Superior Tecnológico Tena", location: "Tena, Napo", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Tecnologías turísticas y ambientales.", status: "Evaluación: Agosto", link: "http://www.itstena.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST TSA", name: "Instituto Superior Tecnológico Tsa'chila", location: "Santo Domingo", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Tecnología en agroindustrias, mecatrónica y software.", status: "Evaluación: Agosto", link: "http://www.tsachila.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST TUN", name: "Instituto Superior Tecnológico Tungurahua", location: "Ambato, Tungurahua", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Desarrollo infantil y tecnologías administrativas.", status: "Evaluación: Agosto", link: "https://www.isttungurahua.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST VF", name: "Instituto Superior Tecnológico Vicente Fierro", location: "Tulcán, Carchi", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Mecánica automotriz y desarrollo infantil.", status: "Evaluación: Agosto", link: "https://institutovicentefierro.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST VL", name: "Instituto Superior Tecnológico Vicente León", location: "Latacunga, Cotopaxi", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Administración financiera y contabilidad.", status: "Evaluación: Agosto", link: "http://www.istvicenteleon.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" },
        { siglas: "IST VR", name: "Instituto Superior Tecnológico Vicente Rocafuerte", location: "Guayaquil, Guayas", process: "asistido", evalType: "mixto", evalLabel: "Virtual y Presencial", desc: "Desarrollo de software y tecnologías contables.", status: "Evaluación: Agosto", link: "http://www.istvr.edu.ec", nextDate: "2026-08-05", nextEventLabel: "Registro: 5 de Agosto" }
    ];

    const uniGrid = document.getElementById('uni-grid');
    const uniSearch = document.getElementById('uni-search');
    const uniFilter = document.getElementById('uni-filter');
    const uniSort = document.getElementById('uni-sort');

    // Render Universities list dynamically (cronograma.html)
    function renderUniversities(list) {
        if (!uniGrid) return;
        uniGrid.innerHTML = '';
        
        if (list.length === 0) {
            uniGrid.innerHTML = '<p class="no-results" style="grid-column: span 3; text-align: center; color: var(--text-muted); padding: 2rem;">No se encontraron instituciones que coincidan con la búsqueda.</p>';
            return;
        }

        list.forEach(uni => {
            const card = document.createElement('div');
            card.className = 'uni-card';
            card.setAttribute('data-process', uni.process);

            let evalClass = 'eval-presencial';
            if (uni.evalType === 'virtual') evalClass = 'eval-virtual';
            if (uni.evalType === 'mixto') evalClass = 'eval-mixto';

            const processLabel = uni.process === 'propio' ? 'Proceso Propio' : 'Proceso Asistido';
            const processTagClass = uni.process === 'propio' ? 'tag-propio' : 'tag-asistido';
            
            // Check if deadline is past (June 30, 2026 is local date)
            const isPast = uni.nextDate < "2026-06-30";
            const deadlineColor = isPast ? "color: var(--text-muted);" : "color: var(--primary-orange);";
            const deadlineIcon = isPast ? "calendar-days" : "alert-circle";

            // Clean domain for logo API
            const domain = uni.link.replace("https://", "").replace("http://", "").replace("www.", "").split("/")[0];
            const logoUrl = `https://logo.clearbit.com/${domain}?size=128`;

            card.innerHTML = `
                <div class="uni-meta">
                    <span class="uni-tag ${processTagClass}">${processLabel}</span>
                    <span class="uni-eval ${evalClass}">${uni.evalLabel}</span>
                </div>
                <div class="uni-card-logo-container">
                    <img src="${logoUrl}" onerror="this.src='https://api.dicebear.com/7.x/initials/svg?seed=${uni.siglas}&backgroundColor=1e3a8a,00bcd4,f97316&textColor=ffffff&fontWeight=bold';" class="uni-card-logo-img" alt="${uni.name} Logo">
                </div>
                <h4>${uni.siglas} - ${uni.name}</h4>
                <p class="uni-location" style="margin-bottom: 0.5rem;"><i data-lucide="map-pin"></i> ${uni.location}</p>
                <div class="uni-next-event" style="margin-bottom: 0.75rem; font-size: 0.85rem; font-weight: 700; ${deadlineColor}">
                    <i data-lucide="${deadlineIcon}" style="display:inline-block; width:15px; height:15px; vertical-align:middle; margin-right: 0.2rem;"></i> ${uni.nextEventLabel}
                </div>
                <p>${uni.desc}</p>
                <div class="uni-footer">
                    <span class="uni-status"><i data-lucide="calendar"></i> ${uni.status}</span>
                    <a href="${uni.link}" target="_blank" rel="noopener" class="uni-link">Sitio Web <i data-lucide="external-link"></i></a>
                </div>
            `;
            uniGrid.appendChild(card);
        });

        // Reinitialize Lucide Icons for dynamic content
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Filter & Sort Universities function
    function filterUniversities() {
        if (!uniSearch || !uniFilter) return;
        const query = uniSearch.value.toLowerCase().trim();
        const processType = uniFilter.value;
        const sortType = uniSort ? uniSort.value : 'default';

        let filteredList = universidadesData.filter(uni => {
            const textMatch = uni.name.toLowerCase().includes(query) || 
                              uni.siglas.toLowerCase().includes(query) || 
                              uni.location.toLowerCase().includes(query) ||
                              uni.desc.toLowerCase().includes(query);
            
            const processMatch = (processType === 'all') || (uni.process === processType);

            return textMatch && processMatch;
        });

        // Apply Sorting
        if (sortType === 'date-asc') {
            const todayStr = "2026-06-30"; // Current local time metadata
            filteredList.sort((a, b) => {
                const isPastA = a.nextDate < todayStr;
                const isPastB = b.nextDate < todayStr;

                // Past deadlines go to the very bottom
                if (isPastA && !isPastB) return 1;
                if (!isPastA && isPastB) return -1;

                // Otherwise sort chronologically
                return a.nextDate.localeCompare(b.nextDate);
            });
        } else {
            // Default alphabetical sort by siglas / name
            filteredList.sort((a, b) => a.siglas.localeCompare(b.siglas));
        }

        renderUniversities(filteredList);
    }

    if (uniSearch && uniFilter && uniSort) {
        uniSearch.addEventListener('input', filterUniversities);
        uniFilter.addEventListener('change', filterUniversities);
        uniSort.addEventListener('change', filterUniversities);
    }

    // Initial render in cronograma.html
    if (uniGrid) {
        filterUniversities();
    }

    // ==========================================
    // 5. FAQ ACCORDION INTERACTION (contacto.html)
    // ==========================================
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parent = trigger.parentElement;
            const isCurrentlyActive = parent.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
            });

            // Toggle selected item
            if (!isCurrentlyActive) {
                parent.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ==========================================
    // 6. CONTACT FORM SIMULATION (contacto.html)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formSuccessBox = document.getElementById('form-success-box');
    const submitBtn = document.getElementById('submit-form-btn');

    if (contactForm && formSuccessBox) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Disable submit button and show loading status
            submitBtn.disabled = true;
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Enviando... <i data-lucide="loader" class="animate-spin"></i>';
            if (typeof lucide !== 'undefined') lucide.createIcons();

            // Simulate server request (1.5 seconds)
            setTimeout(() => {
                contactForm.classList.add('hidden');
                formSuccessBox.classList.remove('hidden');
                
                // Clear inputs
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }, 1500);
        });
    }

    // ==========================================
    // 7. MINI-SIMULADOR QUIZ INTERACTIVE LOGIC (simulador.html)
    // ==========================================
    
    // Quiz Questions Data
    const quizQuestions = [
        {
            subject: "Razonamiento Numérico",
            question: "Si 3 obreros construyen una pared en 12 horas, ¿cuánto tiempo tardarán 9 obreros en construir la misma pared?",
            options: [
                { text: "36 horas", correct: false },
                { text: "6 horas", correct: false },
                { text: "4 horas", correct: true },
                { text: "8 horas", correct: false }
            ],
            feedback: "Se trata de una regla de tres inversa. Si aumentamos al triple el número de obreros (3 * 3 = 9), el tiempo se reduce a la tercera parte (12 / 3 = 4 horas). A más obreros, menos horas."
        },
        {
            subject: "Física (Dinámica)",
            question: "Un cuerpo de 5 kg de masa se desplaza con una aceleración constante de 3 m/s². ¿Cuál es la fuerza neta aplicada sobre el cuerpo?",
            options: [
                { text: "15 Newton (N)", correct: true },
                { text: "1.66 Newton (N)", correct: false },
                { text: "8 Newton (N)", correct: false },
                { text: "25 Newton (N)", correct: false }
            ],
            feedback: "Según la Segunda Ley de Newton, la fuerza neta es igual al producto de la masa por la aceleración (F = m * a). Así: F = 5 kg * 3 m/s² = 15 N."
        },
        {
            subject: "Razonamiento Verbal",
            question: "Seleccione la analogía correcta: PÁJARO : NIDO :: ______",
            options: [
                { text: "Perro : Collar", correct: false },
                { text: "Oso : Cueva", correct: true },
                { text: "Estudiante : Libro", correct: false },
                { text: "Pez : Red", correct: false }
            ],
            feedback: "La relación analógica es de 'ser vivo a su refugio natural'. Un pájaro habita en un nido, tal como el oso habita en una cueva."
        },
        {
            subject: "Química (Gases)",
            question: "A temperatura constante, el volumen de una masa fija de gas es inversamente proporcional a la presión que ejerce. ¿A qué ley corresponde?",
            options: [
                { text: "Ley de Charles", correct: false },
                { text: "Ley de Gay-Lussac", correct: false },
                { text: "Ley de Boyle-Mariotte", correct: true },
                { text: "Ley de Avogadro", correct: false }
            ],
            feedback: "La Ley de Boyle-Mariotte establece que a temperatura constante (proceso isotérmico), el producto de la presión por el volumen es constante: P₁ * V₁ = P₂ * V₂ (inversamente proporcionales)."
        },
        {
            subject: "Razonamiento Lógico (Sucesiones)",
            question: "¿Qué número continúa la serie: 2, 5, 11, 23, 47, ...?",
            options: [
                { text: "94", correct: false },
                { text: "95", correct: true },
                { text: "96", correct: false },
                { text: "93", correct: false }
            ],
            feedback: "El patrón de la serie es multiplicar el número anterior por 2 y sumarle 1: (2*2)+1=5; (5*2)+1=11; (11*2)+1=23; (23*2)+1=47; (47*2)+1=95."
        }
    ];

    // Quiz DOM Elements
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizStartView = document.getElementById('quiz-start-view');
    const quizQuestionView = document.getElementById('quiz-question-view');
    const quizResultView = document.getElementById('quiz-result-view');
    
    const quizProgressText = document.getElementById('quiz-progress');
    const quizTimerText = document.getElementById('quiz-timer');
    const questionTextEl = document.getElementById('question-text');
    const optionsContainer = document.getElementById('quiz-options-container');
    const feedbackBox = document.getElementById('quiz-feedback-box');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    
    const resultScore = document.getElementById('result-score');
    const resultTime = document.getElementById('result-time');
    const resultPercent = document.getElementById('result-percent');
    const resultMessage = document.getElementById('result-message');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');

    // Quiz State Variables
    let currentQuestionIndex = 0;
    let quizScore = 0;
    let timerInterval = null;
    let elapsedSeconds = 0;

    // Helper: format time in 00:00
    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Start Timer
    function startTimer() {
        if (!quizTimerText) return;
        elapsedSeconds = 0;
        quizTimerText.innerHTML = `<i data-lucide="timer"></i> ${formatTime(elapsedSeconds)}`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
        
        timerInterval = setInterval(() => {
            elapsedSeconds++;
            quizTimerText.innerHTML = `<i data-lucide="timer"></i> ${formatTime(elapsedSeconds)}`;
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }, 1000);
    }

    // Stop Timer
    function stopTimer() {
        clearInterval(timerInterval);
    }

    // Load Question
    function loadQuestion(index) {
        if (!optionsContainer) return;
        // Reset states
        feedbackBox.classList.add('hidden');
        nextQuestionBtn.disabled = true;
        
        const q = quizQuestions[index];
        quizProgressText.innerText = `Pregunta ${index + 1} de ${quizQuestions.length} (${q.subject})`;
        questionTextEl.innerText = q.question;
        
        // Clean options container
        optionsContainer.innerHTML = '';
        
        // Populate options
        q.options.forEach(opt => {
            const button = document.createElement('button');
            button.className = 'quiz-opt';
            button.innerText = opt.text;
            button.addEventListener('click', () => selectOption(button, opt, q.feedback));
            optionsContainer.appendChild(button);
        });
    }

    // Select Option
    function selectOption(button, option, feedback) {
        const buttons = optionsContainer.querySelectorAll('.quiz-opt');
        buttons.forEach(btn => {
            btn.disabled = true;
        });
        
        const isCorrect = option.correct;
        
        if (isCorrect) {
            button.classList.add('correct');
            quizScore++;
            feedbackTitle.innerText = "¡Respuesta Correcta! ✔";
            feedbackBox.classList.remove('wrong-feedback');
        } else {
            button.classList.add('wrong');
            feedbackTitle.innerText = "Respuesta Incorrecta ✖";
            feedbackBox.classList.add('wrong-feedback');
            
            const q = quizQuestions[currentQuestionIndex];
            const correctIndex = q.options.findIndex(o => o.correct);
            if (correctIndex !== -1) {
                buttons[correctIndex].classList.add('correct');
            }
        }
        
        feedbackText.innerText = feedback;
        feedbackBox.classList.remove('hidden');
        nextQuestionBtn.disabled = false;
    }

    // Next Question Action
    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                loadQuestion(currentQuestionIndex);
            } else {
                showResults();
            }
        });
    }

    // Show Results
    function showResults() {
        stopTimer();
        quizQuestionView.classList.add('hidden');
        quizResultView.classList.remove('hidden');
        
        resultScore.innerText = `${quizScore}/${quizQuestions.length}`;
        const pct = Math.round((quizScore / quizQuestions.length) * 100);
        resultPercent.innerText = `${pct}%`;
        
        const min = Math.floor(elapsedSeconds / 60);
        const sec = elapsedSeconds % 60;
        resultTime.innerText = min > 0 ? `${min}m ${sec}s` : `${sec}s`;
        
        if (quizScore === 5) {
            resultMessage.innerText = "¡Espectacular! Obtuviste un puntaje perfecto. Tienes un perfil ideal para becas y universidades de alta exigencia (EPN, ESPOL). ¡Inscríbete y accede a simuladores completos en Moodle!";
        } else if (quizScore >= 3) {
            resultMessage.innerText = "¡Buen trabajo! Tienes bases bien consolidadas, pero para asegurar tu cupo necesitas entrenar con simuladores completos cronometrados en nuestro campus virtual.";
        } else {
            resultMessage.innerText = "No te preocupes, el examen mide áreas muy diversas. Te recomendamos ingresar a nuestra aula virtual para resolver simuladores básicos interactivos.";
        }
    }

    // Restart Quiz Action
    if (restartQuizBtn) {
        restartQuizBtn.addEventListener('click', () => {
            quizResultView.classList.add('hidden');
            quizStartView.classList.remove('hidden');
        });
    }

    // Start Quiz Button
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', () => {
            quizStartView.classList.add('hidden');
            quizQuestionView.classList.remove('hidden');
            currentQuestionIndex = 0;
            quizScore = 0;
            startTimer();
            loadQuestion(currentQuestionIndex);
        });
    }

    // ==========================================
    // 8. GALERÍA DE ADMISIÓN (galeria.html)
    // ==========================================
    const uniGalleryGrid = document.getElementById('uni-gallery-grid');
    const instGalleryGrid = document.getElementById('inst-gallery-grid');

    if (uniGalleryGrid && instGalleryGrid) {
        // Clear templates
        uniGalleryGrid.innerHTML = '';
        instGalleryGrid.innerHTML = '';

        // Populate universities in Gallery
        universidadesData.filter(item => item.process === 'propio').forEach(uni => {
            const card = document.createElement('div');
            card.className = 'gallery-card';
            
            const domain = uni.link.replace("https://", "").replace("http://", "").replace("www.", "").split("/")[0];
            const logoUrl = `https://logo.clearbit.com/${domain}?size=128`;

            card.innerHTML = `
                <div class="gallery-image-box">
                    <img src="${logoUrl}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" class="gallery-logo-img" alt="${uni.name} Logo">
                    <span class="gallery-avatar" style="display:none;">${uni.siglas}</span>
                </div>
                <div class="gallery-card-content">
                    <h4>${uni.name}</h4>
                    <span class="gallery-location"><i data-lucide="map-pin"></i> ${uni.location}</span>
                </div>
            `;
            uniGalleryGrid.appendChild(card);
        });

        // Populate institutes in Gallery
        universidadesData.filter(item => item.process === 'asistido').forEach(inst => {
            const card = document.createElement('div');
            card.className = 'gallery-card';
            
            const domain = inst.link.replace("https://", "").replace("http://", "").replace("www.", "").split("/")[0];
            const logoUrl = `https://logo.clearbit.com/${domain}?size=128`;

            card.innerHTML = `
                <div class="gallery-image-box color-teal">
                    <img src="${logoUrl}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" class="gallery-logo-img" alt="${inst.name} Logo">
                    <span class="gallery-avatar" style="display:none;">${inst.siglas}</span>
                </div>
                <div class="gallery-card-content">
                    <h4>${inst.name}</h4>
                    <span class="gallery-location"><i data-lucide="map-pin"></i> ${inst.location}</span>
                </div>
            `;
            instGalleryGrid.appendChild(card);
        });

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

});
