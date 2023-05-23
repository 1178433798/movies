import { request } from '../utils/request.js'

export function editadmins(data) {
  return request({
    url: '/editadmins',
    method: 'post',
    data
  })
}
export function page1(params) {
  return request({
    url: '/movies/page',
    method: 'get',
    params
  })
}
export function type(data) {
  return request({
    url: '/movies/count/type/' + data,
    method: 'get'
  })
}
export function country(data) {
  return request({
    url: '/movies/count/country/' + data,
    method: 'get'
  })
}
export function count(data) {
  return request({
    url: '/movies/count?start=2010&end=2022',
    method: 'get'
  })
}
export function top10(data) {
  return request({
    url: '/movies/top10/' + data,
    method: 'get'
  })
}
export function score(data) {
  return request({
    url: '/movies/count/score/' + data,
    method: 'get'
  })
}
export function like(params) {
  return request({
    url: '/api/like/' + params,
    method: 'post'
  })
}
export function liketype(params) {
  return request({
    url: '/api/like',
    method: 'get',
    params
  })
}
export function hot() {
  return request({
    url: '/movies/hot',
    method: 'get'
  })
}
export function comment(data) {
  return request({
    url: '/api/comment',
    method: 'post',
    data
  })
}
export function news() {
  return request({
    url: '/movies/new',
    method: 'get'
  })
}
export function detail(params) {
  return request({
    url: '/movies/detailed',
    method: 'get',
    params
  })
}
export function history() {
  return request({
    url: '/api/history',
    method: 'get'

  })
}
export function introduce() {
  return request({
    url: '/api/introduce',
    method: 'get'

  })
}
export function initIntroduce() {
  return request({
    url: '/api/initIntroduce',
    method: 'get'

  })
}
export function compare(s) {
  return request({
    url: '/movies/compare/' + s,
    method: 'get'

  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getById(id) {
  return request({
    url:'/movie/'+id,
    method:'get'
  })
}

