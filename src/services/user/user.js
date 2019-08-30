import request from 'umi-request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/apis/currentUser');
}

export async function queryNotices() {
  return request('/api/notices');
}
