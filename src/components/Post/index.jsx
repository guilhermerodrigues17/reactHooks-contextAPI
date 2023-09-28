import './styles.css';
import { PostCards } from '../PostCards';
import p from 'prop-types';

export const Post = ({ posts = [] }) => {
  return (
    <div className="posts-container">
      {posts.map(({ id, title, body, cover }) => {
        return <PostCards key={id} title={title} body={body} cover={cover} />;
      })}
    </div>
  );
};

Post.propTypes = {
  posts: p.array,
};
