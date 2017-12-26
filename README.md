# molecule-chart
Sample project to demonstrate how to show chart and interact with it using REACTJS.

### Features ###
1. Show scatter chart from json input file.
2. Display chemical graphics using [ChemDoodle](https://web.chemdoodle.com/)
---------------------------

## Notes ##

#### Chart input
```json
{
  [
    "className": "Class A",
    "color": "#1C2833",
    "data": [
      { "x": 100, "y": 200, "z": 1},
      { "x": 120, "y": 100, "z": 2},
      { "x": 170, "y": 300, "z": 3}
  ]
}
```
Please specify class's color using Hex color codes. 
Z axis represents keys which are used to find its chemical graphic.

#### Database input
This file contains chemical graphics database.
```json
[
  {"file":"MDL MOLFiles content"}
]
```
> MDL MOLFiles – have become a standard for basic molecular data. They end with a .mol extension. Use the ChemDoodle.readMOL() function to parse this data and return a Molecule data structure.

Please prefer to https://web.chemdoodle.com/tutorial/loading-data/ for more information.
