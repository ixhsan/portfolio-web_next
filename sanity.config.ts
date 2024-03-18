import { defineConfig } from "sanity";
import { vercelDeployTool } from "sanity-plugin-vercel-deploy";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";

const config = defineConfig({
  projectId: "uupjd18j",
  dataset: "production",
  title: "My Personal Website",
  apiVersion: "2023-04-18",
  basePath: "/admin",
  plugins: [deskTool(), vercelDeployTool()],
  schema: { types: schemas },
});

export default config;
