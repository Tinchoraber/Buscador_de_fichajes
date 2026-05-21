let jugadores = [];
let jugadoresFiltrados = [];

// Cargar el CSV
Papa.parse('data/players_final.csv', {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
        jugadores = results.data.filter(j => j.player);
        jugadoresFiltrados = jugadores;
        mostrarTabla(jugadores);
        console.log(`${jugadores.length} jugadores cargados ✓`);
    }
});

// Mostrar tabla
function mostrarTabla(data) {
    const tbody = document.getElementById('tabla-body');
    const contador = document.getElementById('contador');
    
    contador.textContent = `(${data.length} jugadores encontrados)`;
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; padding:2rem; color:#8b949e;">No se encontraron jugadores con esos criterios</td></tr>';
        return;
    }

    tbody.innerHTML = data.map(j => `
        <tr>
            <td><strong>${j.player || '-'}</strong></td>
            <td>${j.team || '-'}</td>
            <td><span class="badge-liga">${formatearLiga(j.league)}</span></td>
            <td>${j.posicion_detalle || j.position || '-'}</td>
            <td>${j.edad || '-'}</td>
            <td>${j.goles || 0}</td>
            <td>${j.asistencias || 0}</td>
            <td>${j.partidos || 0}</td>
            <td class="valor-mercado">${formatearValor(j.valor_mercado)}</td>
            <td>${formatearContrato(j.fin_contrato)}</td>
        </tr>
    `).join('');
}

// Formatear liga
function formatearLiga(liga) {
    const nombres = {
        'ENG-Premier League': 'Premier League',
        'ESP-La Liga': 'La Liga',
        'GER-Bundesliga': 'Bundesliga',
        'ITA-Serie A': 'Serie A',
        'FRA-Ligue 1': 'Ligue 1'
    };
    return nombres[liga] || liga;
}

// Formatear valor de mercado
function formatearValor(valor) {
    if (!valor) return '-';
    if (valor >= 1000000) return `€${(valor / 1000000).toFixed(1)}M`;
    if (valor >= 1000) return `€${(valor / 1000).toFixed(0)}K`;
    return `€${valor}`;
}

// Formatear fecha de contrato
function formatearContrato(fecha) {
    if (!fecha) return '-';
    return fecha.toString().split(' ')[0];
}

// Buscar jugadores
document.getElementById('btn-buscar').addEventListener('click', () => {
    const posicion = document.getElementById('filtro-posicion').value;
    const liga = document.getElementById('filtro-liga').value;
    const edadMax = document.getElementById('filtro-edad').value;
    const presupuesto = document.getElementById('filtro-presupuesto').value;
    const golesMin = document.getElementById('filtro-goles').value;
    const asistenciasMin = document.getElementById('filtro-asistencias').value;

    jugadoresFiltrados = jugadores.filter(j => {
        if (posicion && j.position !== posicion) return false;
        if (liga && j.league !== liga) return false;
        if (edadMax && j.edad > parseInt(edadMax)) return false;
        if (presupuesto && j.valor_mercado > parseInt(presupuesto)) return false;
        if (golesMin && j.goles < parseInt(golesMin)) return false;
        if (asistenciasMin && j.asistencias < parseInt(asistenciasMin)) return false;
        return true;
    });

    mostrarTabla(jugadoresFiltrados);
});

// Limpiar filtros
document.getElementById('btn-limpiar').addEventListener('click', () => {
    document.getElementById('filtro-posicion').value = '';
    document.getElementById('filtro-liga').value = '';
    document.getElementById('filtro-edad').value = '';
    document.getElementById('filtro-presupuesto').value = '';
    document.getElementById('filtro-goles').value = '';
    document.getElementById('filtro-asistencias').value = '';
    mostrarTabla(jugadores);
});

// Ordenar por columna al hacer clic en el header
document.querySelectorAll('thead th').forEach((th, index) => {
    th.addEventListener('click', () => {
        const columnas = ['player', 'team', 'league', 'posicion_detalle', 'edad', 'goles', 'asistencias', 'partidos', 'valor_mercado', 'fin_contrato'];
        const col = columnas[index];
        jugadoresFiltrados.sort((a, b) => {
            if (typeof a[col] === 'number') return b[col] - a[col];
            return (a[col] || '').toString().localeCompare((b[col] || '').toString());
        });
        mostrarTabla(jugadoresFiltrados);
    });
});