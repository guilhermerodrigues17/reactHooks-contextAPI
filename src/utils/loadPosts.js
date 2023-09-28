export const loadPosts = async () => {
  const postsFetch = fetch('https://jsonplaceholder.typicode.com/posts');
  const photosFetch = fetch('https://jsonplaceholder.typicode.com/photos');

  const [posts, photos] = await Promise.all([postsFetch, photosFetch]);
  const postsJson = await posts.json();
  const photosJson = await photos.json();

  const postAndPhoto = postsJson.map((post, index) => {
    return { ...post, cover: photosJson[index].url };
  });

  return postAndPhoto;
};
