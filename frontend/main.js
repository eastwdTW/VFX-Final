// menu handler
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu-container');
menuButton.addEventListener('click', (e) => {
    menu.style.display = 'block';
})

const closeButton = document.getElementById('close-button');
closeButton.addEventListener('click', (e) => {
    menu.style.display = 'none';
})

const shell = document.getElementById('shell');
shell.addEventListener('click', (e) => {
    menu.style.display = 'none';
})

// image preview handler
const input1 = document.getElementById('imageUpload1');
const fileNameSpan1 = document.getElementById('fileName1');
const preview1 = document.getElementById('preview1');

input1.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileNameSpan1.textContent = file.name;

        const reader = new FileReader();
        reader.onload = (e) => {
            preview1.src = e.target.result;
            preview1.style.display = 'block';
        }
        reader.readAsDataURL(file);
    } else {
        fileNameSpan1.textContent = '';
        preview1.style.display = 'none';
        preview1.src = '';
    }
});

const input2 = document.getElementById('imageUpload2');
const fileNameSpan2 = document.getElementById('fileName2');
const preview2 = document.getElementById('preview2');

input2.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileNameSpan2.textContent = file.name;

        const reader = new FileReader();
        reader.onload = (e) => {
            preview2.src = e.target.result;
            preview2.style.display = 'block';
        }
        reader.readAsDataURL(file);
    } else {
        fileNameSpan2.textContent = '';
        preview2.style.display = 'none';
        preview2.src = '';
    }
});

// loading animation & images upload handler
const start = document.getElementsByClassName('start')[0]
const loading = document.getElementById('loading')
const loadingDots = document.getElementsByClassName('dot')
const preview3 = document.getElementById('preview3');
const radius = 65
const color = []
var count = 0

for (let i = 0; i < 8; i++) {
    var r = 65 + 110 * i / 8;
    var g = 50 + 110 * i / 8;
    var b = 0 + 95 * i / 8;
    color.push(`rgb(${r}, ${g}, ${b})`);
}

start.addEventListener('click', () => {
    loading.style.display = 'block';
    for (let i = 0; i < loadingDots.length; i++) {
        const element = loadingDots[i];
        var deg = 2*Math.PI * i / 8;
        element.style.top = `calc(50% - 12px - ${radius*Math.cos(deg)}px)`;
        element.style.left = `calc(50% - 12px - ${radius*Math.sin(deg)}px)`;
        element.style.backgroundColor = color[i];
    }

    count = 1;
    setInterval(update, 100);

    const formData = new FormData();
    formData.append("content", input1.files[0]);
    formData.append("style", input2.files[0]);

    fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData
    })
    .then(res => res.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        preview3.src = url;
        preview3.style.display = 'block';
        loading.style.display = 'none';
    })
    .catch(err => {
        console.error("錯誤：", err);
        alert('Error!')
        loading.style.display = 'none';
    });

})

const update = () => {
    for (let i = 0; i < loadingDots.length; i++) {
        const element = loadingDots[i];
        var idx = (i+count) % 8
        element.style.backgroundColor = color[idx];
    }
    count++;
}

// large image preview handler
const largeImageContainer = document.createElement('div');
const largeImage = document.createElement('img');
const body = document.getElementsByTagName('body')[0];
preview3.addEventListener('click', (e) => {
    largeImageContainer.style.position = 'fixed';
    largeImageContainer.style.top = '0';
    largeImageContainer.style.left = '0';
    largeImageContainer.style.width = '100%';
    largeImageContainer.style.height = '100%';
    largeImageContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    largeImageContainer.style.display = 'flex';
    largeImageContainer.style.justifyContent = 'center';
    largeImageContainer.style.alignItems = 'center';
    largeImageContainer.style.zIndex = '1000';

    largeImage.src = preview3.src;
    largeImage.style.maxWidth = '90%';
    largeImage.style.maxHeight = '90%';

    largeImageContainer.appendChild(largeImage);
    body.appendChild(largeImageContainer);

    largeImageContainer.addEventListener('click', () => {
        body.removeChild(largeImageContainer);
    });
});