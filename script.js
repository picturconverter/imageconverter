document.getElementById('convertButton').addEventListener('click', function() {
    const fileInput = document.getElementById('imageInput');
    const formatSelect = document.getElementById('formatSelect');
    const canvas = document.getElementById('canvas');
    const downloadLink = document.getElementById('downloadLink');

    if (fileInput.files.length === 0) {
        alert('Please select an image file.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const convertedImage = canvas.toDataURL(`image/${formatSelect.value}`);
            downloadLink.href = convertedImage;
            downloadLink.download = `converted.${formatSelect.value}`;
            downloadLink.style.display = 'block';
        };
        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
});