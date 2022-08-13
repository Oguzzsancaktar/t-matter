import React from 'react'
import ContentLoader from 'react-content-loader'

interface IProps {
  count: number
}
const TableSkeltonLoader: React.FC<IProps> = ({ count }) => {
  return (
    <ContentLoader
      speed={2}
      width={'100%'}
      height={'100%'}
      viewBox={`0 0 100% ${count * 45} `}
      backgroundColor={'#f3f3f3'}
      foregroundColor={'#ecebeb'}
    >
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="40" />
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <rect key={index} x="0" y={index * 58 + 45} rx="5" ry="5" width="100%" height="53" />
        ))}
    </ContentLoader>
  )
}

export default TableSkeltonLoader
