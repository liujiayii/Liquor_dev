import request from '@/utils/request';

export async function fetch(data) {
  return request('/admin/listLog', {data});
}
