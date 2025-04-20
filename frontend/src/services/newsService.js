export const fetchArticles = async (token) => {
  const url = token ? '/news/api/my-news/' : '/news/api/newsapi-articles/';
  const opts = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
  const res = await fetch(url, opts);
  return res.json();
};
