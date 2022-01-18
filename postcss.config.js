module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-inline-media"),
    require("postcss-custom-properties", {
      importFrom: ["./css/variables.css"],
    }),
    require("postcss-custom-media", {
      importFrom: ["./css/variables.css"],
    }),
    require("autoprefixer"),
    require("postcss-sorting"),
    require("cssnano"),
  ],
};