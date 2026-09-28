export interface Project {
  id: string
  /** 项目名称 */
  name: string
  /** 项目简介（一句话到一段话） */
  description: string
  /** 该项目的 GitHub 仓库地址 */
  githubUrl: string
  /** 项目截图路径（16:9） */
  screenshot: string
}

// TODO: 占位数据，真实项目信息与截图由用户提供
export const projects: Project[] = [
  {
    id: 'project-1',
    name: '项目一',
    description: '这是项目一的占位简介，请替换为真实项目的描述。',
    githubUrl: 'https://github.com/your-username/project-1',
    screenshot: '/projects/placeholder-1.svg',
  },
  {
    id: 'project-2',
    name: '项目二',
    description: '这是项目二的占位简介，请替换为真实项目的描述。',
    githubUrl: 'https://github.com/your-username/project-2',
    screenshot: '/projects/placeholder-2.svg',
  },
  {
    id: 'project-3',
    name: '项目三',
    description: '这是项目三的占位简介，请替换为真实项目的描述。',
    githubUrl: 'https://github.com/your-username/project-3',
    screenshot: '/projects/placeholder-3.svg',
  },
  {
    id: 'project-4',
    name: '项目四',
    description: '这是项目四的占位简介，请替换为真实项目的描述。',
    githubUrl: 'https://github.com/your-username/project-4',
    screenshot: '/projects/placeholder-4.svg',
  },
]
