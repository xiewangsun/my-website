export interface AboutContent {
  /** 个人照片路径（3:4 竖版） */
  photo: string
  /** 照片的替代文本 */
  photoAlt: string
  /** 个人简介（三段） */
  bio: string[]
  /** 品牌标签 */
  brandTags: string[]
}

// TODO: 占位数据，真实照片与简介由用户提供
export const about: AboutContent = {
  photo: '/about/placeholder-portrait.svg',
  photoAlt: '你的名字的个人照片',
  bio: [
    '这是第一段占位简介：你的背景与经历，替换为真实内容。',
    '这是第二段占位简介：你正在做什么、擅长什么，替换为真实内容。',
    '这是第三段占位简介：你的兴趣与你相信的东西，替换为真实内容。',
  ],
  brandTags: ['赋范空间'],
}
