export const DOMAIN = "";
const CREDENTIALS = process.env.ORIGIN ? "include" : "same-origin";

export const addComment = async params => {
  let { article, userId, comment } = params;

  let url = DOMAIN + `/api/article_details/${article._id}/comment`;

  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        article: article,
        content: comment
      }),
      credentials: CREDENTIALS
    });
  } catch (e) {
    // console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const addSubComment = async params => {
  let { parentId, userId, subComment } = params;

  let url = DOMAIN + "/api/addSubComment";

  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        content: subComment,
        parentId: parentId
      }),
      credentials: CREDENTIALS
    });
  } catch (e) {
    // console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const deleteSubComment = async params => {
  let { commentId, subCommentId } = params;

  let url = DOMAIN + "/api/deleteSubComment";

  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        commentId,
        subCommentId
      }),
      credentials: CREDENTIALS
    });
  } catch (e) {
    // console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const chancelSubComment = async params => {
  let { commentId, subCommentId } = params;

  let url = DOMAIN + "/api/chancelSubComment";

  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        commentId,
        subCommentId
      }),
      credentials: CREDENTIALS
    });
  } catch (e) {
    // console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const getComment = async (articleId, page, range) => {
  let url = DOMAIN + `/api/article_details/${articleId}/get_comment`;

  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        page,
        range
      }),
      credentials: CREDENTIALS
    });
  } catch (e) {
    // console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const getAllComment = async (page, eachPageArticles) => {
  let url = DOMAIN + "/api/comment_admin/getAll/comment";

  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        page,
        eachPageArticles
      }),
      credentials: CREDENTIALS
    });
  } catch (e) {
    // console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const getNotCheckedAndReportedComments = async () => {
  let url = DOMAIN + "/api/get_NotChecked_And_Reported_Comments";

  try {
    var result = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      credentials: CREDENTIALS
    });
  } catch (e) {
    // console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const deleteComment = async (commentId, article) => {
  let url = DOMAIN + `/api/comment_delete/${commentId}`;
  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        article: article
      }),
      credentials: CREDENTIALS
    });
  } catch (e) {
    // console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const cancleComment = async commentId => {
  let url = DOMAIN + "/api/comment_cancel";
  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        commentId
      }),
      credentials: CREDENTIALS
    });
  } catch (e) {
    // console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const changeCommentCheck = async commentId => {
  let url = DOMAIN + `/api/comment_checked/${commentId}`;
  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      credentials: CREDENTIALS
    });
  } catch (e) {
    // console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const thumbsUp = async (commentId, userId) => {
  let url = DOMAIN + `/api/comment/${commentId}/thumbsUp`;

  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userId
      }),
      credentials: CREDENTIALS
    });
  } catch (e) {
    // console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const thumbsDown = async (commentId, userId) => {
  let url = DOMAIN + `/api/comment/${commentId}/thumbsDown`;

  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userId
      }),
      credentials: CREDENTIALS
    });
  } catch (e) {
    // console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const reportCommentById = async (commentId, userId) => {
  let url = DOMAIN + `/api/comment/${commentId}/report`;

  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userId
      }),
      credentials: CREDENTIALS
    });
  } catch (e) {
    // console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};

export const subCommentReport = async params => {
  let { commentId, parentId, userId } = params,
    url = DOMAIN + `/api/comment/${commentId}/sub_report`;

  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userId,
        parentId
      }),
      credentials: CREDENTIALS
    });
  } catch (e) {
    // console.log(e);
  }

  if (result) {
    return result.json();
  } else {
    return {
      code: "-2",
      message: "未知错误"
    };
  }
};
