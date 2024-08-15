const { ipcRenderer } = require('electron');

async function updateImage() {
  const imageSrc = await ipcRenderer.invoke('get-current-image');
  document.getElementById('galleryImage').src = imageSrc;
}

document.addEventListener('DOMContentLoaded', async () => {
  await updateImage();

  document.getElementById('nextImage').addEventListener('click', async () => {
    ipcRenderer.send('next-image');
    await updateImage();
  });

  document.getElementById('prevImage').addEventListener('click', async () => {
    ipcRenderer.send('prev-image');
    await updateImage();
  });
});
