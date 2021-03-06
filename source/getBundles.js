/**
 * react-loadable-ssr-addon
 * @author Marcos Gonçalves <contact@themgoncalves.com>
 * @version 0.1.2
 */

/**
 * getBundles
 * @param {object} manifest - The assets manifest content generate by ReactLoadableSSRAddon
 * @param {array} chunks - Chunks list to be loaded
 * @returns {array} - Assets list group by file type
 */
/* eslint-disable no-param-reassign */
function getBundles(manifest, chunks) {
  const assetsKey = chunks.reduce((key, chunk) => {
    if (manifest.origins[chunk]) {
      key = [...key, ...manifest.origins[chunk]];
    }
    return key;
  }, []);

  return assetsKey.reduce((bundle, asset) => {
    Object.keys(manifest.assets[asset]).forEach((key) => {
      const content = manifest.assets[asset][key];
      if (!bundle[key]) { bundle[key] = []; }
      bundle[key] = [...bundle[key], ...content];
    });
    return bundle;
  }, {});
}
/* eslint-enabled */

export default getBundles;
