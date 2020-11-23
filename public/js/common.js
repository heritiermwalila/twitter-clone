((j) => {
  j(document).ready(($) => {
    const addPostBtn = $("#addPostFormBtn");
    const addPostText = $("#addPostText");
    const postItemCnt = $(".timeline_post_item");
    addPostBtn.attr("disabled", true);

    addPostText.keyup((event) => {
      const content = addPostText.val().trim();
      if (content.length > 0) {
        addPostBtn.attr("disabled", false);
      } else {
        addPostBtn.attr("disabled", true);
      }
    });

    addPostBtn.click((event) => {
      const content = addPostText.val().trim();
      const post = {
        content,
      };

      fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          addPostText.val("");
        })
        .catch((error) => {
          console.log(error);
        });
    });

    /**
     * GET POSTS
     */
    const getPosts = async () => {
      let content = "";
      const posts = await (
        await fetch("/api/posts", {
          headers: { "Content-Type": "application/json" },
        })
      ).json();
      posts.reverse().forEach((post) => {
        content += `
        <div class="timeline_post_item_content">
            <div class="timeline_item_head d-flex align-items-center">
                <div class="avatar pb-3">
                    <image src="/images/avatar.webp" width="49px" height="49px" />
                </div>
                <div class="timeline_item_head_content pl-2">
                    <h4 class="h5 title mb-0">${post.user.firstname} ${post.user.lastname}</h4>
                    <p class="timeline_head_sub"><span>Replying to </span><a href="">@${post.user.username}</a></p>
                </div>
              </div>
            <p class="timeline_item_desc">${post.content}</p>
            <div class="timeline_post_item_action d-flex align-items center justify-content-between">
                <div class="tweet_item"><span class="icon-comment"></span><span>23</span></div>
                <div class="item_item"><span class="icon-retweet"></span><span>2</span></div>
                <div class="item_item"><span class="icon-heart-empty"></span><span>3</span></div>
                <div class="item_item"><span class="icon-upload-cloud"></span></div>
            </div>
        </div>
      `;
        postItemCnt.html(content);
      });
    };

    getPosts();
  });
})(jQuery);
