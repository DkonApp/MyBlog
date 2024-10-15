const accountId = 4178; //Your ID
const accessToken = '39dfa832683d2ee2ecc7835da975e1bb'; // Your Token
const profileId = 4177; //Your ID ((ID 4177 EXAMPLE))
const clientId = 1302;

async function fetchNews() {
    const formData = new URLSearchParams();
    formData.append('accountId', accountId);
    formData.append('accessToken', accessToken);
    formData.append('profileId', profileId);

    try {
        const response = await fetch('https://api.dkon.app/api/v3/method/wall.get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.error) {
            displayNews(data.posts);
        } else {
            console.error('Error when receiving news:', data);
        }
    } catch (error) {
        console.error('Error when receiving fetchNews:', error);
    }
}

function displayNews(posts) {
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = ''; 

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.fromUserFullname} (${post.timeAgo})</h3>
            <p>${post.post}</p>
            ${post.imgUrl ? `<img src="${post.imgUrl}" alt="Image">` : ''}
        `;
        newsContainer.appendChild(postElement);
    });
}

async function fetchGallery() {
    const formData = new URLSearchParams();
    formData.append('clientId', clientId);
    formData.append('accountId', accountId);
    formData.append('accessToken', accessToken);
    formData.append('profileId', profileId);

    try {
        const response = await fetch('https://api.dkon.app/api/v3/method/gallery.get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.error) {
            displayGallery(data.items);
        } else {
            console.error('Error receiving the gallery:', data);
        }
    } catch (error) {
        console.error('Error when receiving fetchGallery:', error);
    }
}

function displayGallery(items) {
    const galleryContainer = document.getElementById('gallery');
    galleryContainer.innerHTML = ''; 

    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'gallery-item';
        itemElement.innerHTML = `
            <img src="${item.previewImgUrl}" alt="Gallery Image">
        `;
        galleryContainer.appendChild(itemElement);
    });
}


fetchNews();
fetchGallery();
