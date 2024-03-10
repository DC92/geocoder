import {
  readFileSync
} from 'fs';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS module into ES module
import css from 'rollup-plugin-import-css'; // Collect css
import json from '@rollup/plugin-json';
import pluginReplace from '@rollup/plugin-replace'; // To include the version in the distribution
import terser from '@rollup/plugin-terser'; // Rollup plugin to minify generated es bundle

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const timeBuild = new Date().toLocaleString();
const external = Object.keys(pkg.dependencies); // To import external ref (ol...)
const globals = {};

const openlayers = [
  ['ol/control/Control', 'ol.control.Control'],
  ['ol/style/Style', 'ol.style.Style'],
  ['ol/style/Icon', 'ol.style.Icon'],
  ['ol/layer/Vector', 'ol.layer.Vector'],
  ['ol/source/Vector', 'ol.source.Vector'],
  ['ol/geom/Point', 'ol.geom.Point'],
  ['ol/proj', 'ol.proj'],
  ['ol/Feature', 'ol.Feature'],
];

openlayers.forEach((each) => {
  external.push(each[0]);
  globals[each[0]] = each[1];
});

const banner = readFileSync('./build/banner.js', 'utf-8')
  .replace('{name}', pkg.name)
  .replace('{description}', pkg.description)
  .replace('{homepage}', pkg.homepage)
  .replace('{version}', pkg.version)
  .replace('{time}', timeBuild);

export default [{
    // Compressed library
    external,
    input: './build/geocoder.js',
    output: {
      file: './dist/ol-geocoder.js',
      name: 'Geocoder',
      banner,
      globals,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**',
      }),
      json({
        exclude: 'node_modules/**'
      }),
      pluginReplace({
        preventAssignment: true,
        __geocoderBuildVersion__: pkg.version,
      }),
      css({
        output: 'ol-geocoder.min.css',
        minify: true,
      }),
      terser({
        output: {
          comments: /^!/
        }
      }),
    ],
  },
  {
    // Full debug library
    external,
    input: './build/geocoder.js',
    output: {
      file: './dist/ol-geocoder-debug.js',
      name: 'Geocoder',
      banner,
      globals,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**',
      }),
      json({
        exclude: 'node_modules/**'
      }),
      pluginReplace({
        preventAssignment: true,
        __geocoderBuildVersion__: pkg.version,
      }),
      css({
        output: 'ol-geocoder.css',
      }),
    ],
  },
];