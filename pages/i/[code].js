import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Loading } from 'components'

export default function Access() {
  const router = useRouter()
  const { code } = router.query

  useEffect(() => {
    async function loadLink() {
      if (typeof code === 'undefined') {
        return
      }

      const res = await fetch(`/api/shortcuts/${code}`)
      const data = await res.json()

      if (data?.error) {
        return <Loading white={true} />
      }

      return router.push(data.origin)
    }

    loadLink()
  }, [code])

  return <Loading white={true} />
}
