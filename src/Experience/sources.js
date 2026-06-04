export default [
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      "textures/environmentMap/px.jpg",
      "textures/environmentMap/nx.jpg",
      "textures/environmentMap/py.jpg",
      "textures/environmentMap/ny.jpg",
      "textures/environmentMap/pz.jpg",
      "textures/environmentMap/nz.jpg",
    ],
  },
  {
    name: "grassColorTexture",
    type: "texture",
    path: "textures/dirt/color.jpg",
  },
  {
    name: "grassNormalTexture",
    type: "texture",
    path: "textures/dirt/normal.jpg",
  },

  // _______________ GLB MODELS _______________//
  // {
  //   name: "foxModel",
  //   type: "gltfModel",
  //   path: "models/Fox/glTF/Fox.gltf",
  // },
  // {
  //   name: "mur_chrysler",
  //   type: "gltfModel",
  //   path: "models/Mur_Chrysler/Mur_Chrysler.glb",
  // },
  // {
  //   name: "mur_chrysler3",
  //   type: "gltfModel",
  //   path: "models/Mur_Chrysler/Mur_Chrysler3.glb",
  // },

  {
    name: "tour_chrysler",
    type: "gltfModel",
    path: "models/TourChrysler/Tour_Chrysler.glb",
  },
  {
    name: "route",
    type: "gltfModel",
    path: "models/route/Route.glb",
  },
  {
    name: "cube_loca",
    type: "gltfModel",
    path: "models/Cubeloca/Cube_Loca.glb",
  },
  {
    name: "back_building",
    type: "gltfModel",
    path: "models/BackgroundBuildings/backBuilding.glb",
  },

  // _______________ TEXTURES _______________//

  {
    name: "paletteTexture",
    type: "texture",
    path: "images/palette/palette.png",
  },
  {
    name: "paletteTexture2",
    type: "texture",
    path: "images/palette/palette2.png",
  },

  {
    name: "paletteTexture3",
    type: "texture",
    path: "images/palette/palette3.png",
  },

  {
    name: "motif1",
    type: "texture",
    path: "images/motifs/motif1.png",
  },

  // _______________ MASK _______________//
  {
    name: "revealMask",
    type: "texture",
    path: "images/masks/revealMask.jpg",
  },
  {
    name: "motifMask",
    type: "texture",
    path: "images/masks/motifMask.png",
  },
  {
    name: "motifMaskBaked",
    type: "texture",
    path: "images/masks/motifMaskBaked.png",
  },
  {
    name: "routeMaskBaked",
    type: "texture",
    path: "images/masks/routeMaskBaked.png",
  },
  {
    name: "backgroundBuildingMaskBaked",
    type: "texture",
    path: "images/masks/backgroundBuildingMaskBaked.png",
  },
];
