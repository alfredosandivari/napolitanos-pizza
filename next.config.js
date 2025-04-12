const { domainToFoodtruck } = require('./lib/domain-mapping');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    const rules = Object.entries(domainToFoodtruck).map(([domain, id]) => ({
      source: '/',
      has: [{ type: 'host', value: domain }],
      destination: `/g/${id}`,
    }));

    return rules;
  },
};

module.exports = nextConfig;
