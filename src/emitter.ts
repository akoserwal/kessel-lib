import { EmitContext, emitFile, resolvePath,
  Namespace,
  Model, 
  ModelProperty,
  Program,
  Service,
  Operation,
  Type,
  getDirectoryPath,
  getNamespaceFullName,
  interpolatePath,
  listServices,
  navigateType,
} from "@typespec/compiler";
import { getAllHttpServices, getOperationParameters, listHttpOperationsIn, getHttpOperation } from "@typespec/http";

import { reportDiagnostic, StateKeys} from "./lib.js";
import {getPremread} from "./decorators.js"

interface JSONOutput {
  name: string;
  imports: string[];
  types: KesselSpec[];
}

interface KesselSpec {
  name: string;
  visibility: string;
  relations: Relation[];
}

interface Relation {
  name: string;
  visibility: string;
  body: {
    kind: string;
    cardinality?: string;
    module: string;
    type?: {
      module: string;
      name: string;
    };
    relation?: string;
    sub_relation?: string;
  };
  extensions?: Array<{
    module: string;
    name: string;
    params: {
      full_name: string;
    };
  }>;
}



export async function $onEmit(context: EmitContext) {
  const path = resolvePath(context.emitterOutputDir, "output.json")

 // emitAllServices(context.program)

  const models: KesselSpec[] =  emitAllModels(context.program);
  const output: JSONOutput = {
    name: "inventory",
    imports: ["iam"],
    types: models,
  };

  await context.program.host.writeFile(path, JSON.stringify(output, null, 2));
}

// async function emitAllServices(program: Program,) {
//   const services = listServices(program);

//   for (const service of services) {
//     console.log(service.title)
//     console.log(service.type.name)
//     const ns = service.type.namespace;
//     //console.log(ns)

//     for (const ops of service.type.operations){
//     //  console.log(ops)
//     }

    
//   }

// }

function emitAllModels(program: Program): KesselSpec[] {
  const models: KesselSpec[] = [];

  for (const m of program.stateMap(StateKeys.read)) {
     m.filter(model => program.stateMap(StateKeys.read).has(model)).map(model => {
      const decoratorApp = program.stateMap(StateKeys.read).get(model);
      console.log(model)
      models.push( {
        name: model.namespace.name,
        visibility: "public", // Assuming all models are public for this example
        relations: getRelations(model)
      });

     })
  }
  return models;
}

function getRelations(model: Model): Relation[] {
  // Mock function to demonstrate how you might gather relations
  // Replace with actual logic to extract relations from your models

  return [
    {
      name: model.name,
      visibility: "private",
      body: {
        kind: "self",
        cardinality: "ExactlyOne",
        module: "iam",
        type: {
          module: "iam",
          name: "workspace"
        }
      }
    },
    {
      name: model.name,
      visibility: "public",
      body: {
        kind: "nested_reference",
        relation: "workspace",
        sub_relation: "inventory_hosts_read",
        module: ""
      },
      extensions: [
        {
          module: "iam",
          name: "workspace_permission",
          params: {
            full_name: "inventory_hosts_read"
          }
        }
      ]
    }
  ];
}