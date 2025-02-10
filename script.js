// script.js

// Function to load articles from local storage
function loadArticles() {
    const storedArticles = localStorage.getItem('articles');
    return storedArticles ? JSON.parse(storedArticles) : [];
}

// Function to save articles to local storage
function saveArticles() {
    localStorage.setItem('articles', JSON.stringify(articles));
}

// Initialize articles from local storage
let articles = loadArticles();

// Function to display articles on the main page
function displayArticles() {
    const articleList = document.getElementById('article-list');
    articleList.innerHTML = ''; // Clear existing articles
    articles.forEach((article, index) => {
        const articleItem = document.createElement('div');
        articleItem.classList.add('article-item');
        articleItem.innerHTML = `
            <h4>${article.title}</h4>
            <p>${article.content}</p>
            <p><strong>Date:</strong> ${article.date}</p>
            ${article.image ? `<img src="${article.image}" alt="Article Image">` : ''}
            ${article.video ? `<video controls><source src="${article.video}" type="video/mp4">Your browser does not support the video tag.</video>` : ''}
            <button onclick="viewArticle(${index})">Read More</button>
        `;
        articleList.appendChild(articleItem);
    });
}

// Function to view article details
function viewArticle(index) {
    const article = articles[index];
    localStorage.setItem('currentArticle', JSON.stringify(article)); // Store the article in local storage
    window.location.href = 'article.html'; // Redirect to article details page
}

// Admin login functionality
document.getElementById('login-btn')?.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('login-message');

    // Simple authentication check
    if (username === 'pranav' && password === 'pranav@3710') {
        loginMessage.textContent = 'Login successful!';
        document.getElementById('article-section').style.display = 'block';
        displayExistingArticles(); // Display existing articles after login
    } else {
        loginMessage.textContent = 'Invalid credentials. Please try again.';
    }
});

// Article submission functionality
document.getElementById('submit-article-btn')?.addEventListener('click', () => {
    const title = document.getElementById('article-title').value;
    const content = document.getElementById('article-content').value;
    const date = document.getElementById('article-date').value;
    const image = document.getElementById('article-image').value;
    const video = document.getElementById('article-video').value;
    const submitMessage = document.getElementById('submit-message');

    // Validate input
    if (title && content && date) {
        // Add article to the articles array
        articles.push({ title, content, date, image, video });
        saveArticles(); // Save articles to local storage
        submitMessage.textContent = 'Article submitted successfully!';

        // Clear input fields
        document.getElementById('article-title').value = '';
        document.getElementById('article-content').value = '';
        document.getElementById('article-date').value = '';
        document.getElementById('article-image').value = '';
        document.getElementById('article-video').value = '';

        // Display updated articles
        displayExistingArticles();
        displayArticles();
    } else {
        submitMessage.textContent = 'Please fill in all required fields.';
    }
});
// Function to display existing articles in the admin panel
function displayExistingArticles() {
    const existingArticlesDiv = document.getElementById('existing-articles');
    existingArticlesDiv.innerHTML = ''; // Clear existing articles
    articles.forEach((article, index) => {
        const existingArticle = document.createElement('div');
        existingArticle.classList.add('existing-article');
        existingArticle.innerHTML = `
            <span>${article.title}</span>
            <div>
                <button onclick="editArticle(${index})">Edit</button>
                <button onclick="deleteArticle(${index})">Delete</button>
            </div>
        `;
        existingArticlesDiv.appendChild(existingArticle);
    });
}

// Function to edit an article
function editArticle(index) {
    const article = articles[index];
    document.getElementById('article-title').value = article.title;
    document.getElementById('article-content').value = article.content;
    document.getElementById('article-date').value = article.date;
    document.getElementById('article-image').value = article.image || '';
    document.getElementById('article-video').value = article.video || '';

    // Change the submit button to say "Update Article"
    const submitButton = document.getElementById('submit-article-btn');
    submitButton.textContent = 'Update Article';

    // Add an event listener to update the article
    submitButton.onclick = function() {
        updateArticle(index);
    };
}

// Function to update an article
function updateArticle(index) {
    const title = document.getElementById('article-title').value;
    const content = document.getElementById('article-content').value;
    const date = document.getElementById('article-date').value;
    const image = document.getElementById('article-image').value;
    const video = document.getElementById('article-video').value;
    const submitMessage = document.getElementById('submit-message');

    // Validate input
    if (title && content && date) {
        // Update the article in the articles array
        articles[index] = { title, content, date, image, video };
        saveArticles(); // Save articles to local storage
        submitMessage.textContent = 'Article updated successfully!';

        // Clear input fields
        document.getElementById('article-title').value = '';
        document.getElementById('article-content').value = '';
        document.getElementById('article-date').value = '';
        document.getElementById('article-image').value = '';
        document.getElementById('article-video').value = '';

        // Reset the button text
        const submitButton = document.getElementById('submit-article-btn');
        submitButton.textContent = 'Add Article';
        submitButton.onclick = function() {
            // Original add article functionality
            addArticle();
        };

        // Display updated articles
        displayExistingArticles();
        displayArticles();
    } else {
        submitMessage.textContent = 'Please fill in all required fields.';
    }
}

// Function to delete an article
function deleteArticle(index) {
    articles.splice(index, 1); // Remove the article from the array
    saveArticles(); // Save updated articles to local storage
    displayExistingArticles(); // Update the displayed articles
    displayArticles(); // Update the main article list
}

// Display articles on the main page when it loads
if (document.getElementById('article-list')) {
    displayArticles();
}

// Display article details on the article page
if (document.getElementById('article-detail')) {
    const currentArticle = JSON.parse(localStorage.getItem('currentArticle'));
    if (currentArticle) {
        const articleDetail = document.getElementById('article-detail');
        articleDetail.innerHTML = `
            <h4>${currentArticle.title}</h4>
            <p>${currentArticle.content}</p>
            <p><strong>Date:</strong> ${currentArticle.date}</p>
            ${currentArticle.image ? `<img src="${currentArticle.image}" alt="Article Image">` : ''}
            ${currentArticle.video ? `<video controls><source src="${currentArticle.video}" type="video/mp4">Your browser does not support the video tag.</video>` : ''}
        `;
    }
}