import { FaPython, FaJava } from 'react-icons/fa'

export const algorithmPk = {
  0: '랜덤',
  1: '기초',
  2: '탐색',
  3: '이분탐색',
  4: '자료구조',
  5: '완전탐색',
  6: 'BFS/DFS',
  7: 'DP',
}

export const algorithmPkNoRandom = {
  1: '기초',
  2: '탐색',
  3: '이분탐색',
  4: '자료구조',
  5: '완전탐색',
  6: 'BFS/DFS',
  7: 'DP',
}

export const languagePk = {
  1: 'Python',
  2: 'Java',
}

export const languagePkInitialCode = {
  1: `class Solution:
  print("sccs")
`,
  2: `class Solution{
  public static void main(String[] args) {
    System.out.println("sccs");
  }
}
`,
}

export const languageIconPk = {
  1: <FaPython key={1} />,
  2: <FaJava key={2} />,
}
