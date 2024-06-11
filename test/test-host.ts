import { createTestHost, createTestWrapper } from "@typespec/compiler/testing";
import { KesselLibTestLibrary } from "../src/testing/index.js";

export async function createKesselLibTestHost() {
  return createTestHost({
    libraries: [KesselLibTestLibrary],
  });
}

export async function createKesselLibTestRunner() {
  const host = await createKesselLibTestHost();

  return createTestWrapper(host, {
    autoUsings: ["KesselLib"]
  });
}

