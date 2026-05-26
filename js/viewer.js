// ==========================
// TOKEN CESIUM
// ==========================

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNTc2OTg0ZS0zNmM1LTRhMWMtOWRlMi01MGFiNDEyMGVlNzEiLCJpZCI6NDM1ODk5LCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoidW5kZWZpbmVkX2RlZmF1bHQiLCJpYXQiOjE3Nzk2NTQzOTd9.NSIrpcOPjoukHZDTglyr9M7eaRjshf-q9L6PHfTT17s";
    

// ==========================
// CREAR VISOR
// ==========================

const viewer = new Cesium.Viewer(
  "cesiumContainer",
  {

    animation:false,
    timeline:false,
    baseLayerPicker:false,
    geocoder:false,
    homeButton:false,
    sceneModePicker:false,
    navigationHelpButton:false,
    infoBox:false,
    fullscreenButton:false,

    terrain: Cesium.Terrain.fromWorldTerrain()

  }
);


// ==========================
// CONFIG GENERAL
// ==========================

viewer.scene.globe.enableLighting = true;

viewer.scene.skyAtmosphere.show = true;

viewer.scene.fog.enabled = true;

viewer.cesiumWidget.creditContainer.style.display =
  "none";


// ==========================
// CARGAR GEOJSON
// ==========================

async function cargarGeoJSON(){

  const geojson =
    await Cesium.GeoJsonDataSource.load(
      "assets/poblacion_de_12_anos_y_mas_economicamente_activa.geojson",
      {
        clampToGround:false
      }
    );

  viewer.dataSources.add(geojson);

  entidades =
    geojson.entities.values;

  for(let i = 0; i < entidades.length; i++){

    const entity = entidades[i];

    // Verificar que exista polígono
    if(!entity.polygon){
      continue;
    }

    // Obtener valor
    const valor =
      Number(entity.properties._Field4?._value);

    // Validar número
    if(isNaN(valor)){
      continue;
    }

    // Escala altura
    const altura =
      valor * 3;

    // Altura base
    entity.polygon.height = 0;

    // Extrusión
    entity.polygon.extrudedHeight =
      altura;

    // Material
    entity.polygon.material =
      Cesium.Color.fromCssColorString(
        "#00ffaa"
      ).withAlpha(0.75);

    // Outline
    entity.polygon.outline = false;

  }

  // Zoom automático
  viewer.flyTo(geojson);

}
let entidades = [];
cargarGeoJSON();

// ==========================
// FILTRO _Field4
// ==========================

const slider =
  document.getElementById(
    "filtroField4"
  );

const valorFiltro =
  document.getElementById(
    "valorFiltro"
  );


slider.addEventListener("input", () => {

  const minimo =
    Number(slider.value);

  valorFiltro.textContent =
    minimo;

  for(let i = 0; i < entidades.length; i++){

    const entity =
      entidades[i];

    if(!entity.polygon){
      continue;
    }

    const valor =
      Number(
        entity.properties._Field4?._value
      );

    entity.show =
      valor >= minimo;

  }

});