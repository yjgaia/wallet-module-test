import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import buffer from "buffer";

const config: webpack.Configuration = {
  entry: {
    "bundle": "./app/main.ts",
    __less: "./docs/style/main.less",
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: "css-loader",
          options: {
            url: false,
          },
        }, "less-loader"],
      },
      {
        test: /\.ya?ml$/,
        use: "yaml-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".less"],
    extensionAlias: {
      ".js": [".js", ".ts"],
    },
    fallback: {
      buffer: require.resolve("buffer"),
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve("docs"),
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
  ],
};

export default config;
