import React from "react";
import moment from "moment/min/moment-with-locales";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import "./_comment.scss";
import { useState } from "react";
const Comment = ({ message, handleComment, subComments }) => {
  /*   const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment; */
  const { _id, comment, userId, createdAt } = message;
  const [isReply, setReply] = useState(false);
  const [response, setResponse] = useState("");

  const handleReply = () => {
    setReply(!isReply);
  };

  moment.locale("fr");
  return (
    <div className="p-2 comment d-flex">
      <img src={userId?.photo} alt="" className="mr-3 rounded-circle" />
      <div className="comment__body">
        <p className="mb-1 comment__header">
          {userId?.username} • {moment(createdAt).fromNow()}
        </p>
        <p className="mb-1" dangerouslySetInnerHTML={{ __html: comment }} />
        <div className="like-dislike mb-2">
          <span>
            <MdThumbUp size={20} /> {1}
          </span>
          <span>
            <MdThumbDown size={20} /> {1}
          </span>
          <span className="reply" onClick={handleReply}>
            Répondre
          </span>
        </div>
        {isReply && (
          <div>
            <div className="my-2 comment__form d-flex w-100">
              <img
                src={userId?.photo}
                alt="avatar"
                className="mr-3 rounded-circle"
              />
              <form
                onSubmit={(e) => {
                  handleComment(e, response, _id);
                }}
                className="d-flex flex-grow-1"
              >
                <input
                  type="text"
                  className="flex-grow-1"
                  placeholder="Ajoutez une réponse…"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  //onKeyDown={handleTyping}
                />
                <button className="p-2 border-0">Répondre</button>
              </form>
            </div>
            <div className="comment__list">
              <div className="my-3">{subComments.length} réponses</div>
              {subComments?.map((reply, i) => (
                <Comment
                  key={i}
                  message={reply}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
