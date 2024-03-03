import {
  readFileSync
} from 'fs';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-import-css'; // Collect .css imports in .js modules
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser'; // Rollup plugin to minify generated es bundle

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const external = Object.keys(pkg.dependencies);
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
  .replace('{time}', new Date().toLocaleString());

export default [{
    external,
    input: './build/dist.js',
    output: {
      banner,
      globals,
      file: './dist/ol-geocoder.js',
      sourcemap: true,
      format: 'umd',
      name: 'Geocoder',
    },
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**',
      }),
      css({
        output: 'ol-geocoder.css',
      }),
      json({
        exclude: 'node_modules/**'
      }),
      terser({
        output: {
          comments: /^!/
        }
      }),
    ],
  },
  {
    external,
    input: './build/dist.js',
    output: {
      banner,
      globals,
      file: './dist/ol-geocoder-debug.js',
      sourcemap: true,
      format: 'umd',
      name: 'Geocoder',
    },
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**',
      }),
      css({
        minify: true,
        output: 'ol-geocoder.min.css',
      }),
      json({
        exclude: 'node_modules/**'
      }),
    ],
  },
];