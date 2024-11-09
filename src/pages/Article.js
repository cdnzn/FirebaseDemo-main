import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';
import EditIcon from '../assets/edit.webp';

export default function Article() {
  const { urlId } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const ref = doc(db, 'articles', urlId);
    getDoc(ref)
      .then((snapshot) => {
        setArticle(snapshot.data());
      });
  }, [urlId]);

  const handleEdit = () => {
    navigate(`/edit/${urlId}`);
  };

  return (
    <div>
      <img 
        className="icon"
        onClick={handleEdit}
        src={EditIcon} alt="edit icon" 
      />

      {!article && <p>No records found!</p>}
      {article && (
        <div>
          <h2>{article.title}</h2>
          <p>By {article.author}</p>
          <p>{article.description}</p>
        </div>
      )}
    </div>
  );
}
