    const images = [
        { src: '/image/gallery_1.png' },
        { src: '/image/gallery_2.jpg' },
        { src: '/image/gallery_3.jpg' },
        { src: '/image/gallery_4.jpg' },
        { src: '/image/gallery_5.jpg' },
        { src: '/image/gallery_6.jpg' }
    ];
    let currentImageIndex = 0;

    const galleryImage = document.getElementById('galleryImage');

    function updateImage() {
        galleryImage.src = images[currentImageIndex].src;
    }

    document.getElementById('prevBtn').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage();
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    });

    updateImage();