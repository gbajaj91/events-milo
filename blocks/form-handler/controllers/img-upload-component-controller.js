async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  await fetch('http://localhost:8000/upload', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function handleFiles(wrapper, files) {
  const previewWrapper = wrapper.querySelector('.preview-wrapper');
  const imgPlaceholder = wrapper.querySelector('.preview-img-placeholder');
  const fileInput = wrapper.querySelector('.img-file-input');
  const dz = wrapper.querySelector('.dropzone');
  const deleteBtn = wrapper.querySelector('.icon-delete');

  if (files.length > 0) {
    const file = files[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const img = new Image();
        img.src = e.target.result;
        previewWrapper.classList.remove('hidden');
        dz.classList.add('hidden');
        imgPlaceholder.innerHTML = '';
        imgPlaceholder.append(img);

        await uploadImage(file);
      };

      reader.readAsDataURL(file);
    }
  }

  deleteBtn.addEventListener('click', () => {
    fileInput.value = '';
    previewWrapper.classList.add('hidden');
    imgPlaceholder.innerHTML = '';
    dz.classList.remove('hidden');
  });
}

export default function init(component) {
  const imgFileInputWrapper = component.querySelectorAll('.img-file-input-wrapper');

  imgFileInputWrapper.forEach((wrapper) => {
    const dropZone = wrapper.querySelector('.dropzone');
    const fileInput = wrapper.querySelector('.img-file-input');

    if (dropZone) {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((event) => {
        dropZone.addEventListener(event, (e) => {
          e.preventDefault();
          e.stopPropagation();
        }, false);
      });

      dropZone.addEventListener('dragover', (e) => {
        e.currentTarget.classList.add('dragover');
      });

      dropZone.addEventListener('dragleave', (e) => {
        e.currentTarget.classList.remove('dragover');
      });

      dropZone.addEventListener('drop', (e) => {
        const { files } = e.dataTransfer;
        handleFiles(wrapper, files);
        e.currentTarget.classList.remove('dragover');
      });
    }

    fileInput?.addEventListener('change', (e) => {
      const { files } = e.currentTarget;
      handleFiles(wrapper, files);
    });
  });
}

export function onSubmit(component) {
  console.log(component);
  return {};
}
