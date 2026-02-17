import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repository = process.env.GITHUB_REPOSITORY ?? "";
const repoName = repository.split("/")[1] ?? "";
const isUserOrOrgPagesRepo = repoName.endsWith(".github.io");
const basePath =
  isGithubActions && !isUserOrOrgPagesRepo && repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
