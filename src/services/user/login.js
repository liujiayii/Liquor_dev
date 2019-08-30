import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/login/login', {
    data: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
