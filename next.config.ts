import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/resume.pdf",
        headers: [
          {
            key: "Content-Type",
            value: "application/pdf",
          },
          {
            key: "Content-Disposition",
            value: "attachment; filename=M-Aqib-Resume.pdf",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
