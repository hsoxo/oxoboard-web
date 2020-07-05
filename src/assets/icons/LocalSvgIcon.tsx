import React from 'react'

// @ts-ignore
const requireAllSvgs = require.context('./svg', false, /^\.\/.*\.(svg)$/)
const svgMap = requireAllSvgs
  .keys()
  .map((filename: string) => ({
    [filename]: requireAllSvgs(filename).default || requireAllSvgs(filename)
  }))
  .reduce((prev: any, cur: any) => Object.assign(prev, cur), {})

const LocalSvgIcon: React.FC<{ name: string }> = ({ name }) => {
  const Component = svgMap[`./${name}.svg`]
  return <>{Component ? <Component /> : name}</>
}

export default LocalSvgIcon
