let Instantiate = (divID, jsonPath,progress) => {
    return UnityLoader.instantiate(divID, jsonPath, {onProgress: progress});
}
// /onProgress: progress
export default {
  Instantiate
}