import request from '@/utils/request';

export async function fetch(data) {
  return request('/user/listAll', {data});
}

export async function reset() {
  return request('/user/updateOrder')
}
