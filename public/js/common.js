((j) => {
  j(document).ready(($) => {
    const addPostBtn = $("#addPostFormBtn");
    const addPostText = $("#addPostText");
    addPostBtn.attr("disabled", true);

    addPostText.keyup((event) => {
      const content = addPostText.val().trim();
      if (content.length > 0) {
        addPostBtn.attr("disabled", false);
      } else {
        addPostBtn.attr("disabled", true);
      }
    });
  });
})(jQuery);
