/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const { domainToFoodtruck } = require('./lib/domain-mapping');

module.exports = {
  async rewrites() {
    const rules = Object.entries(domainToFoodtruck).map(([domain, id]) => ({
      source: '/',
      has: [{ type: 'host', value: domain }],
      destination: `/g/${id}`,
    }));

    return rules;
  },
};



export default nextConfig;
