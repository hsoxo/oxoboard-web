import React from 'react'

// @ts-ignore
const requireAllSvgs = require.context('./svg', false, /^\.\/.*\.(svg)$/)
const svgMap = requireAllSvgs
  .keys()
  .map((filename: string) => ({
    [filename]: requireAllSvgs(filename).default || requireAllSvgs(filename)
  }))
  .reduce((prev: any, cur: any) => Object.assign(prev, cur), {})

const PaintBoardIcons: React.FC<{ size?: number; name: string }> = ({ name, size }) => {
  const Component = svgMap[`./${name}.svg`]
  return <>{Component ? <Component {...size ? {height: size, width: size} : {}}/> : name}</>
}

export default PaintBoardIcons
