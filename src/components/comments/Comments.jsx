import React, { useEffect } from "react";
import Comment from "../comment/Comment";
import "./_comments.scss";
import {
  getCommentsOfVideoById,
  addComment,
} from "../../redux/actions/comments.action";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Comments = ({ videoId, socket }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("output-comments", (comment) => {
      {
        setMessages(comment);
      }
    });
    socket.on("commentResponse", (comment) =>
      setMessages([comment, ...messages])
    );
    /*  dispatch(getCommentsOfVideoById(videoId)); */
  }, [socket, messages]);
  const parentComments = messages.filter(
    (message) => message.parentCommentId === null
  );
  const subComments = (commentId) => {
   return messages.filter(
      (subComment) =>
        subComment.parentCommentId === commentId 
    );
  };
  const user = JSON.parse(sessionStorage.getItem("mongo-user"));
  useEffect(() => {
    socket.on("typingResponse", (data) => {
      setTypingStatus(data);
      debounce(function () {
        setTypingStatus("");
      }, 1000);
    });
  }, [socket]);
  let timerId = null;
  function debounce(func, timer) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func();
    }, timer);
  }
  const handleTyping = () => {
    socket.emit("typing", `${user?.username} est entrain d'écrire...`);
  };

  const handleComment = (e, text, parentCommentId) => {
    e.preventDefault();
    const currentTime = new Date().getTime();
    // dispatch(addComment(videoId, text));
    if (text.trim()) {
      socket.emit("comment", {
        comment: text,
        videoId: videoId,
        userId: {
          _id: user?._id,
          username: user?.username,
          photo: user?.photo,
        },
        parentCommentId: parentCommentId,
        createdAt: currentTime,
        socketID: socket.id,
      });
    }
    setText("");
  };
  const totalComments = parentComments.length;
  return (
    <div className="comments">
      <p>{totalComments} Commentaires</p>
      <p style={{ height: "6px" }}>{typingStatus}</p>
      <div className="my-2 comments__form d-flex w-100">
        <img src={user?.photo} alt="avatar" className="mr-3 rounded-circle" />
        <form
          onSubmit={(e) => handleComment(e, text)}
          className="d-flex flex-grow-1"
        >
          <input
            type="text"
            className="flex-grow-1"
            placeholder="Ajoutez un commentaire…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleTyping}
          />
          <button className="p-2 border-0">Soumettre</button>
        </form>
      </div>
      <div className="comments__list">
        {parentComments?.map((message, i) => (
          <Comment
          key={i}
            message={message}
            handleComment={handleComment}
            typingStatus={typingStatus}
            subComments={subComments(message._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
