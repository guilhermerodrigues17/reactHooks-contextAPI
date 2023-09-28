import './styles.css';
import { useCallback, useEffect, useState } from 'react';

import { Post } from '../../components/Post';
import { loadPosts } from '../../utils/loadPosts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(9);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = searchValue
    ? allPosts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()))
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postAndPhoto = await loadPosts();
    setPosts(postAndPhoto.slice(page, postsPerPage));
    setAllPosts(postAndPhoto);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  return (
    <section className="main-container">
      <div className="search-container">
        {!!searchValue && <h1>Search value: {searchValue}</h1>}
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && <Post posts={filteredPosts} />}
      {filteredPosts.length === 0 && <p>Not Found :( </p>}

      <div className="btn-container">
        {!searchValue && (
          <Button onClick={loadMorePosts} disabled={noMorePosts}>
            Load more posts...
          </Button>
        )}
      </div>
    </section>
  );
};
