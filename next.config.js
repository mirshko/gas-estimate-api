module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://github.com/mirshko/gas-estimate-api",
        permanent: false,
      },
    ];
  },
};
