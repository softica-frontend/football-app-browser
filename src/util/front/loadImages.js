export const loadImages = (imagePaths) => {
  return Promise.all(
    imagePaths.map(
      (path) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = path;
          img.onload = resolve;
          img.onerror = reject;
        }),
    ),
  );
};
