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

    // UI
    animation:false,
    timeline:false,
    baseLayerPicker:false,
    geocoder:false,
    homeButton:false,
    sceneModePicker:false,
    navigationHelpButton:false,
    infoBox:false,
    fullscreenButton:false,

    // Rendimiento
    shouldAnimate:true,

    // Terreno
    terrain: Cesium.Terrain.fromWorldTerrain()

  }
);


// ==========================
// CONFIGURACIÓN GENERAL
// ==========================

// Iluminación real
viewer.scene.globe.enableLighting = true;

// Atmósfera
viewer.scene.skyAtmosphere.show = true;

// Niebla
viewer.scene.fog.enabled = true;

// FPS más suaves
viewer.scene.requestRenderMode = false;


// ==========================
// CÁMARA INICIAL
// ==========================

viewer.camera.flyTo({

  destination: Cesium.Cartesian3.fromDegrees(
    -89.6237, // longitud
    20.9674,  // latitud
    25000000  // altura
  ),

  duration:3

});


// ==========================
// OCULTAR CREDITOS CESIUM
// ==========================

viewer.cesiumWidget.creditContainer.style.display =
  "none";


// ==========================
// CLICK EN MAPA
// ==========================

const handler =
  new Cesium.ScreenSpaceEventHandler(
    viewer.scene.canvas
  );

handler.setInputAction((click) => {

  const cartesian =
    viewer.camera.pickEllipsoid(
      click.position,
      viewer.scene.globe.ellipsoid
    );

  if(cartesian){

    const cartographic =
      Cesium.Cartographic.fromCartesian(cartesian);

    const lat =
      Cesium.Math.toDegrees(
        cartographic.latitude
      );

    const lon =
      Cesium.Math.toDegrees(
        cartographic.longitude
      );

    console.log(
      `Lat: ${lat.toFixed(6)}
Lon: ${lon.toFixed(6)}`
    );

  }

}, Cesium.ScreenSpaceEventType.LEFT_CLICK);