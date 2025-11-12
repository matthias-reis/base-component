import type { NextConfig } from "next";
import { withYak } from "next-yak/withYak";

const nextConfig: NextConfig = {
  // Disable turbopack for Next Yak compatibility
  // turbopack: {
  //   root: "."
  // }
};

export default withYak(nextConfig);
