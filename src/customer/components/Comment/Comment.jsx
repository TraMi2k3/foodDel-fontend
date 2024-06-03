import { useContext, useEffect, useState } from 'react';
import './comment.scss';
import moment from "moment";
import axios from 'axios';
import { authContext } from '../../../context/authContext';

const Comment = ({ foodId }) => {
  const { url, currentUser } = useContext(authContext);
  const token = localStorage.getItem('token');
  const [desc, setDesc] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const response = await axios.get(url + "/api/comment?foodId=" + foodId);
    setComments(response.data.data)
  }

  const addComments = async (foodId, desc) => {
    if (token) {
      await axios.post(url + "/api/comment/add", { foodId, desc }, { headers: { token } })
    }
    fetchComments()
  }

  const deleteComment = async (commentId) => {
    setComments((prev) => (prev.filter(cmt => !(cmt._id===commentId && cmt.username===currentUser.name))));
    if (token) {
      await axios.post(url + "/api/comment/del/"+ commentId,{foodId}, { headers: { token } })
    }
  }

  useEffect(()=>{
    fetchComments()
  },[])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addComments(foodId, desc);
      setDesc('');
    }
  };
  return (
    <div className='comment'>
      <input
        type="text"
        placeholder="write a comment"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <hr/>
      {comments.map((comment) => (
        <div key={comment._id} className="cmt">
          <div className="info">
            <div className="content">
              <span>{comment.username}</span>
              <p>{comment.desc}</p>
            </div>

            <div className="del">
              {moment(comment.createdAt).fromNow()}
              <button onClick={()=>deleteComment(comment._id)}>x</button>
            </div>
          </div>
          <hr/>
        </div>     
      ))}
    </div>
  )
}

export default Comment
