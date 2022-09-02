import React from 'react'
import ContentLoader from 'react-content-loader'

const UserSkeletonLoader = () => {
  return (
    <ContentLoader speed={2} width={'100%'} height={'100%'} backgroundColor={'#f3f3f3'} foregroundColor={'#ecebeb'}>
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="40" />
    </ContentLoader>
  )
}

export default UserSkeletonLoader
