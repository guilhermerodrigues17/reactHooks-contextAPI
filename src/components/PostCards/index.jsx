import './styles.css';
import p from 'prop-types';

export const PostCards = ({ cover, title, body }) => {
  return (
    <div className="post">
      <img src={cover} alt={title} />
      <div className="post-content">
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    </div>
  );
};

PostCards.propTypes = {
  cover: p.string.isRequired,
  title: p.string.isRequired,
  body: p.string.isRequired,
};
