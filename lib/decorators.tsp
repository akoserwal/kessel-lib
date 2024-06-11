import "../dist/src/decorators.js";

using TypeSpec.Reflection;

namespace KesselLib;


extern dec prem_read(target: Operation, name: valueof string);

extern dec prem_delete(target: Operation, name: valueof string);




// /**
//  * __Example Decorator__
//  * Provide an alternate name for an operation.
//  * @param name The alternate name.
//  */
// extern dec alternateName(target: Operation, name: valueof string);
