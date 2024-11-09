import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import './create.css';

export default function FormArticle() {  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        const docRef = doc(db, 'articles', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setAuthor(data.author);
          setDescription(data.description);
        }
      };
      fetchArticle();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const article = { title, author, description };
    const ref = id ? doc(db, 'articles', id) : collection(db, 'articles');

    if (id) {
      await updateDoc(ref, article);  // Update existing article
    } else {
      await addDoc(ref, article);     // Create new article
    }
    navigate('/');
  };

  return (
    <div className="create">
      <h2 className="page-title">{id ? 'Edit' : 'Add a New'} Article</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        
        <label>
          <span>Author:</span>
          <input 
            type="text" 
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            required
          />
        </label>

        <label>
          <span>Description:</span>
          <textarea 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </label>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
