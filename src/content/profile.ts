export interface Profile {
  /** 名字（Hero 的 h1 与导航栏品牌名） */
  name: string
  /** 职业头衔 */
  role: string
  /** 一句话介绍 */
  tagline: string
}

// TODO: 占位数据，真实内容由用户提供
export const profile: Profile = {
  name: '你的名字',
  role: '你的职业',
  tagline: '一句话介绍你自己',
}
