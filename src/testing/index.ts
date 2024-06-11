import { resolvePath } from "@typespec/compiler";
import { createTestLibrary, TypeSpecTestLibrary } from "@typespec/compiler/testing";
import { fileURLToPath } from "url";

export const KesselLibTestLibrary: TypeSpecTestLibrary = createTestLibrary({
  name: "kessel-lib",
  packageRoot: resolvePath(fileURLToPath(import.meta.url), "../../../../"),
});
