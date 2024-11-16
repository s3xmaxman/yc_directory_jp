import { defineQuery } from "next-sanity";

/**
 * スタートアップの一覧を取得するクエリ
 * @description 検索条件に応じてスタートアップを取得し、作成日の降順で並べ替えます
 */
export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);

/**
 * 特定のIDに基づいてスタートアップを取得するクエリ
 * @description 指定されたIDのスタートアップの詳細情報を取得します
 */
export const STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  }, 
  views,
  description,
  category,
  image,
  pitch,
}`);

/**
 * スタートアップの閲覧数を取得するクエリ
 * @description 指定されたIDのスタートアップの_idとviews数を取得します
 */
export const STARTUP_VIEWS_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id][0]{
      _id, views
  }
`);

/**
 * GitHub IDに基づいて著者情報を取得するクエリ
 * @description 指定されたGitHub IDに一致する著者の詳細情報を取得します
 */
export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
  *[_type == "author" && id == $id][0]{
      _id,
      id,
      name,
      username,
      email,
      image,
      bio
  }
`);
