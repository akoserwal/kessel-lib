import { DecoratorContext, Operation, Program } from "@typespec/compiler";
import { StateKeys, reportDiagnostic } from "./lib.js";
import { $doc } from "@typespec/compiler";
export const namespace = "KesselLib";


export function $prem_read(context: DecoratorContext, target: Operation, name: string){
    context.program.stateMap(StateKeys.read).set(target, name);
}
export function getPremread(program: Program, target: Operation): string | undefined {
     return program.stateMap(StateKeys.read).get(target);
}


export function $prem_delete(context: DecoratorContext, target: Operation, name: string){
  context.program.stateMap(StateKeys.delete).set(target, name);
}
export function getPremdelete(program: Program, target: Operation): string | undefined {
   return program.stateMap(StateKeys.delete).get(target);
}
