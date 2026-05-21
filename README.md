# ⚽ Buscador de Fichajes — Football Scouting Dashboard

## 🌐 Demo en vivo
👉 [Ver el dashboard](https://tinchoraber.github.io/Buscador_de_fichajes/)

## 📋 Descripción
Herramienta interactiva de scouting futbolístico que permite buscar jugadores 
de las 5 grandes ligas europeas aplicando filtros por posición, liga, edad, 
presupuesto, goles y asistencias. Los datos combinan estadísticas reales de 
FBref con valores de mercado de Transfermarkt.

## 🔍 ¿Qué podés hacer?
- Filtrar jugadores por posición, liga, edad y presupuesto máximo
- Buscar jugadores con mínimo de goles y asistencias
- Ordenar la tabla por cualquier columna
- Ver valor de mercado, fin de contrato y estadísticas de la temporada 2024-2025

## 🛠️ Tecnologías utilizadas
- Python (Pandas, soccerdata) — obtención y limpieza de datos
- FBref — estadísticas reales de jugadores
- Transfermarkt — valores de mercado
- HTML, CSS, JavaScript — interfaz web
- PapaParse — lectura del CSV en el navegador
- GitHub Pages — hosting gratuito

## 📁 Estructura del proyecto
Buscador_de_fichajes/
│
├── data/
│   ├── players_final.csv        ← dataset combinado FBref + Transfermarkt
│   ├── fbref_stats.csv          ← estadísticas crudas de FBref
│   ├── players.csv              ← datos de jugadores de Transfermarkt
│   └── player_valuations.csv   ← historial de valores de mercado
│
├── notebooks/
│   └── 01_preparar_datos.ipynb ← limpieza y combinación de datos
│
├── index.html                   ← página principal
├── style.css                    ← estilos
└── script.js                    ← lógica y filtros

## 📊 Dataset
Los datos fueron obtenidos y procesados con Python:
- **FBref** via librería `soccerdata` → estadísticas temporada 2024-2025
- **Transfermarkt** via Kaggle → valores de mercado actualizados

El proceso de limpieza y combinación está documentado en el notebook 
`01_preparar_datos.ipynb`.

## 📌 Ligas incluidas
- Premier League
- La Liga
- Bundesliga
- Serie A
- Ligue 1
