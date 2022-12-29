import React from "react";
import moment from "moment/min/moment-with-locales";
import "./_comment.scss";
const Comment = ({ message }) => {
  /*   const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment; */
  const { comment, userId, createdAt } = message;
  moment.locale("fr");
  return (
    <div className="p-2 comment d-flex">
      <img src={userId?.photo} alt="" className="mr-3 rounded-circle" />
      <div className="comment__body">
        <p className="mb-1 comment__header">
          {userId?.username} • {moment(createdAt).fromNow()}
        </p>
        <p dangerouslySetInnerHTML={{ __html: comment }} />
      </div>
    </div>
  );
};

export default Comment;
