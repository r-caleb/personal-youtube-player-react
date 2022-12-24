import React, { useEffect } from "react";
import Comment from "../comment/Comment";
import "./_comments.scss";
import {
  getCommentsOfVideoById,
  addComment,
} from "../../redux/actions/comments.action";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Comments = ({ videoId, totalComments, socket }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");

  useEffect(() => {
    socket.on("commentResponse", (comment) =>
      setMessages([...messages, comment])
    );
    dispatch(getCommentsOfVideoById(videoId));
  }, [videoId, dispatch, socket, messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => {
      setTypingStatus(data);
      debounce(function () {
        setTypingStatus("");
      }, 1000);
    });
  }, [socket]);
  const comments = useSelector((state) => state.commentList.comments);
  const user = useSelector((state) => state.auth?.user);

  const [text, setText] = useState("");

  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );
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
    socket.emit("typing", `${user?.name} est entrain d'écrire...`);
  };

  const handleComment = (e) => {
    e.preventDefault();
    const currentTime = new Date().getTime();
    // dispatch(addComment(videoId, text));
    if (text.trim() && user?.name) {
      socket.emit("comment", {
        text: text,
        name: user?.name,
        photo: user?.photoURL,
        time: currentTime,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setText("");
  };
  return (
    <div className="comments">
      <p>{totalComments} Commentaires</p>
      <p style={{ height: "6px" }}>{typingStatus}</p>
      <div className="my-2 comments__form d-flex w-100">
        <img
          src={user?.photoURL}
          alt="avatar"
          className="mr-3 rounded-circle"
        />
        <form onSubmit={handleComment} className="d-flex flex-grow-1">
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
        {messages?.map((message, i) => (
          <Comment message={message} typingStatus={typingStatus} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
