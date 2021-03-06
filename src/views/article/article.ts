import http, { ResponseData } from '@src/http';

interface IArticle extends ResponseData  {
  name?: string;
  content?: string;
}

async function findById(id: string) {
  const [err, res] = await http.request({ apiurl: 'article/findById', params: { id } });
  if (err && res.code !== 0) return null;
  const data: IArticle = res.data;
  return data;
}

// 新建文章
async function saveArticle(article) {
  const [err, res] = await http.request({ apiurl: 'article/save', data: article });
  if (err && res.code !== 0) return 0;
  return res.data;
}

// 查询文章列表
async function findArticleList() {
  const [err, res] = await http.request({ apiurl: 'article/findList' });
  if (err && res.code !== 0) return 0;
  return res.data;
}

export {
  findById,
  saveArticle,
  findArticleList
}