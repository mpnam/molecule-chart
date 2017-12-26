var Ajv = require('ajv');
var ajv = Ajv({allErrors: true});


const chartSchema = {
  "items": {
    "type": "object",
    "properties": {
      "className": {
        "type": "string"
      },
      "color": {
        "type": "string",
        "pattern": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
      },
      "data": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "x": { "type": "number" },
            "y": { "type": "number" },
            "z": { "type": "integer" }
          }
        }
      }
    }
  }
};

const databaseSchema = {
  "item": {
    "type": "object"
  }
};

export function validateChart(content) {
  var valid = ajv.validate(chartSchema, content);
  if (valid)
    return "";
  return ajv.errors;
}

export function validateDatabase(content) {
  var valid = ajv.validate(databaseSchema, content);
  if (valid)
    return "";
  return ajv.errors;
}