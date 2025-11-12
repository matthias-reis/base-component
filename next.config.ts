import type { NextConfig } from "next";
import { withYak } from "next-yak/withYak";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
};

export default withYak(nextConfig);
