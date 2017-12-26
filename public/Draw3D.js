function draw(width, height, data) {
  var transformerDistance = new ChemDoodle.TransformCanvas3D('transformDistance', 200, 200);
  // set up visual specifications
  transformerDistance.specs.set3DRepresentation('Ball and Stick');
  transformerDistance.specs.backgroundColor = 'black';
  transformerDistance.specs.atoms_displayLabels_3D = true;
  transformerDistance.specs.shapes_color = '#fff';
  // read in a water molecule
  var water = new ChemDoodle.io.JSONInterpreter().molFrom(data);
  // create a distance object between the hydrogen atoms
  var distance = new ChemDoodle.structures.d3.Distance(water.atoms[1], water.atoms[2]);
  // add the objects to the scene
  transformerDistance.loadContent([water], [distance]);
}