// UI helpers
function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function linkifySafe(text) {
    const escaped = escapeHtml(text);
    const urlRegex = /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;
    return escaped.replace(urlRegex, (url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
}

function renderPosts() {
    const postList = document.getElementById('postList');
    let htmlContent = '';

    postsData.forEach(post => {
        let imagesHtml = '';
        if (post.images && post.images.length > 0) {
            imagesHtml = `<div class="post-images">
                ${post.images.map(url => `<img src="${url}" alt="post image">`).join('')}
            </div>`;
        }

        const verifiedIcon = post.isVerified ? '<i class="fas fa-check-circle" style="color: #1da1f2; font-size: 12px;"></i>' : '';

        htmlContent += `
            <div class="post-card" data-id="${post.id}">
                <div class="post-header">
                    <div class="avatar">
                        <img src="${post.avatar}" alt="avatar">
                    </div>
                    <div class="user-info">
                        <h4>${post.nickname} ${verifiedIcon}</h4>
                        <span>${post.time}</span>
                    </div>
                </div>
                <div class="post-text">
                    ${linkifySafe(post.content).replace(/\n/g, '<br>')}
                </div>
                ${imagesHtml}
                <div class="post-footer">
                    <div class="action-btn"><i class="fas fa-share"></i> ${post.shares}</div>
                    <div class="action-btn" onclick="toggleComment(this)"><i class="far fa-comment"></i> ${post.comments}</div>
                    <div class="action-btn" onclick="toggleLike(this)"><i class="far fa-thumbs-up"></i> <span>${post.likes}</span></div>
                </div>
                <div class="comment-section">
                    <input type="text" class="comment-input" placeholder="写下你的评论..." onkeydown="handleComment(event, this)">
                    <ul class="comment-list"></ul>
                </div>
            </div>
        `;
    });

    postList.innerHTML = htmlContent + postList.innerHTML;
}
