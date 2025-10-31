import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
      ignoreDuringBuilds: true,
  }, typescript: {
      ignoreBuildErrors: true
<<<<<<< HEAD
    }
=======
  }
>>>>>>> 3c83a32 (ignore eslint and typescript during builds)
};

export default nextConfig;
