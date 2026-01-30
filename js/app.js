// App state and interactions
const appState = {
    userName: '我的昵称',
    pendingImages: []
};

function showApp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('topNav').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'flex';
    document.getElementById('profileName').innerText = appState.userName;
    const input = document.getElementById('tweetInput');
    if (input) input.focus();
}

function fakeLogin() {
    const name = document.getElementById('loginName').value.trim();
    appState.userName = name || '我的昵称';
    showApp();
}

function fillDemo() {
    document.getElementById('loginName').value = '演示用户';
    document.getElementById('loginPwd').value = '123456';
    fakeLogin();
    const input = document.getElementById('tweetInput');
    if (input) {
        input.value = '今天做完了 Weibo Lite：能跑、能演示、能截图、能讲故事 ✨';
        publishTweet();
    }
}

function handleImageSelect(event) {
    const files = Array.from(event.target.files || []);
    appState.pendingImages = [];
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = '';

    if (files.length === 0) {
        preview.style.display = 'none';
        return;
    }

    files.slice(0, 9).forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
            appState.pendingImages.push(e.target.result);
            const img = document.createElement('img');
            img.src = e.target.result;
            preview.appendChild(img);
            preview.style.display = 'grid';
        };
        reader.readAsDataURL(file);
    });
}

function publishTweet() {
    const input = document.getElementById('tweetInput');
    const text = input.value.trim();
    const postList = document.getElementById('postList');

    if (!text) {
        alert('内容不能为空哦！');
        return;
    }

    const newPost = document.createElement('div');
    newPost.className = 'post-card';
    newPost.innerHTML = `
        <div class="post-header">
            <div class="avatar">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MyUser" alt="avatar">
            </div>
            <div class="user-info">
                <h4>${appState.userName}</h4>
                <span>刚刚 来自 网页版</span>
            </div>
            <div class="btn-delete" onclick="deletePost(this)"><i class="fas fa-trash-alt"></i></div>
        </div>
        <div class="post-text">
            ${linkifySafe(text).replace(/\n/g, '<br>')}
        </div>
        ${appState.pendingImages.length > 0 ? `
        <div class="post-images">
            ${appState.pendingImages.map(url => `<img src="${url}" alt="post image">`).join('')}
        </div>
        ` : ''}
        <div class="post-footer">
            <div class="action-btn"><i class="fas fa-share"></i> 0</div>
            <div class="action-btn" onclick="toggleComment(this)"><i class="far fa-comment"></i> 0</div>
            <div class="action-btn" onclick="toggleLike(this)"><i class="far fa-thumbs-up"></i> <span>0</span></div>
        </div>
        <div class="comment-section">
            <input type="text" class="comment-input" placeholder="写下你的评论..." onkeydown="handleComment(event, this)">
            <ul class="comment-list"></ul>
        </div>
    `;

    postList.prepend(newPost);
    input.value = '';
    appState.pendingImages = [];
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = '';
    preview.style.display = 'none';
    const imageInput = document.getElementById('imageInput');
    imageInput.value = '';
}

function toggleLike(element) {
    const icon = element.querySelector('i');
    const countSpan = element.querySelector('span');
    let count = parseInt(countSpan.innerText);

    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#fa7d3c';
        count++;
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '#666';
        count--;
    }
    countSpan.innerText = count;
}

function deletePost(btn) {
    const card = btn.closest('.post-card');
    if (confirm('确定要删除这条微博吗？')) {
        card.remove();
    }
}

function toggleComment(btn) {
    const card = btn.closest('.post-card');
    const commentSection = card.querySelector('.comment-section');
    const currentStyle = window.getComputedStyle(commentSection).display;

    if (currentStyle === 'none') {
        commentSection.style.display = 'block';
        commentSection.querySelector('input').focus();
    } else {
        commentSection.style.display = 'none';
    }
}

function handleComment(event, input) {
    if (event.key === 'Enter') {
        const text = input.value.trim();
        if (!text) {
            alert('评论不能为空');
            return;
        }

        const commentList = input.nextElementSibling;
        const newComment = document.createElement('li');
        newComment.className = 'comment-item';
        newComment.innerHTML = `
            <span class="comment-user">${appState.userName}:</span>
            <span>${escapeHtml(text)}</span>
        `;

        commentList.appendChild(newComment);
        input.value = '';

        const card = input.closest('.post-card');
        const commentBtn = card.querySelector('.fa-comment').parentElement;
        let count = parseInt(commentBtn.innerText);
        commentBtn.innerHTML = `<i class="far fa-comment"></i> ${count + 1}`;
    }
}

function mockMcpHot() {
    const hotList = document.getElementById('hotList');
    hotList.innerHTML = mcpHotData.map((item, idx) => {
        const tag = item.tag ? `<span class="hot-tag" style="${item.tagColor ? `background:${item.tagColor}` : ''}">${item.tag}</span>` : '';
        return `<li><span class="rank">${idx + 1}</span> ${item.title} ${tag}</li>`;
    }).join('');
}

function skillGeneratePost() {
    const input = document.getElementById('tweetInput');
    const randomText = skillPostTemplates[Math.floor(Math.random() * skillPostTemplates.length)];
    input.value = randomText;
    input.focus();
}

window.onload = function() {
    renderPosts();
};

// Expose to inline handlers
window.fakeLogin = fakeLogin;
window.fillDemo = fillDemo;
window.handleImageSelect = handleImageSelect;
window.publishTweet = publishTweet;
window.toggleLike = toggleLike;
window.deletePost = deletePost;
window.toggleComment = toggleComment;
window.handleComment = handleComment;
window.mockMcpHot = mockMcpHot;
window.skillGeneratePost = skillGeneratePost;
