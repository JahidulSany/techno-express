let token = localStorage.getItem('authToken');

document.addEventListener('DOMContentLoaded', () => {
  if (token) {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    fetchPosts();
  } else {
    document.getElementById('auth-container').classList.remove('hidden');
    document.getElementById('app-container').classList.add('hidden');
  }
});

function register() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:3001/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.errors) {
        alert(data.errors[0].message);
      } else {
        alert('User registered successfully');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  document.getElementById('username').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
}

function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  fetch('http://localhost:3001/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      // Save the token in the local storage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        token = data.token;

        alert('User Logged In successfully');

        // Fetch the posts list
        fetchPosts();

        // Hide the auth container and show the app container as we're now logged in
        document.getElementById('auth-container').classList.add('hidden');
        document.getElementById('app-container').classList.remove('hidden');
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
}

function logout() {
  fetch('http://localhost:3001/api/users/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  }).then(() => {
    // Clear the token from the local storage as we're now logged out
    localStorage.removeItem('authToken');
    token = null;
    document.getElementById('auth-container').classList.remove('hidden');
    document.getElementById('app-container').classList.add('hidden');
  });
}

function fetchPosts() {
  fetch('http://localhost:3001/api/posts', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((posts) => {
      console.log(posts);
      const postsContainer = document.getElementById('posts');
      postsContainer.innerHTML = '';
      posts.forEach((post) => {
        const article = document.createElement('article');
        article.innerHTML = `
        <div class="post-card">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-content">${post.content}</p>
            <div class="post-actions">
                <button class="btn btn-primary" onclick='openEditModal(${JSON.stringify(post)})'>Edit</button>
                <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
            </div>
        </div>`;
        postsContainer.appendChild(article);
      });
    });
}

function createPost() {
  const title = document.getElementById('post-title').value;
  const content = document.getElementById('post-content').value;
  const categoryId = document.getElementById('categories').value;
  if (!title || !content || !categoryId) {
    alert('You must enter value');
    return;
  }
  fetch('http://localhost:3001/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content, categoryId }),
  })
    .then((res) => res.json())
    .then(() => {
      alert('Post created successfully');
      fetchPosts();
    });
  document.getElementById('post-title').value = '';
  document.getElementById('post-content').value = '';
}

// 1. Fill the modal with data and show it
function openEditModal(post) {
  document.getElementById('edit-post-id').value = post.id;
  document.getElementById('modal-post-title').value = post.title;
  document.getElementById('modal-post-content').value = post.content;
  document.getElementById('modal-categories').value = post.categoryId;
  
  const myModal = new bootstrap.Modal(document.getElementById('editPostModal'));
  myModal.show();
}

// 2. Collect data from modal and send PUT request
function saveButton() {
  const id = document.getElementById('edit-post-id').value;
  const title = document.getElementById('modal-post-title').value;
  const content = document.getElementById('modal-post-content').value;
  const categoryId = document.getElementById('modal-categories').value;

  fetch(`http://localhost:3001/api/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content, categoryId }),
  })
    .then((res) => {
      if (res.ok) {
        alert('Post updated');
        // Close modal
        const modalElement = document.getElementById('editPostModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
        // Refresh list
        fetchPosts();
      }
    });
}
