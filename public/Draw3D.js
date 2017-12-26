function draw(width, height, data) {
  var transformerDistance = new ChemDoodle.TransformCanvas3D('transformDistance', width, height);

  // set up visual specifications
  transformerDistance.specs.set3DRepresentation('Ball and Stick');
  transformerDistance.specs.backgroundColor = 'white';
  transformerDistance.specs.atoms_displayLabels_3D = true;
  transformerDistance.specs.shapes_color = '#000';

  // read in a molecule
  var molecule = ChemDoodle.readMOL(data, 1);
	transformerDistance.loadMolecule(molecule);
}