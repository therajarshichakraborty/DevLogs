'use client'

import { useTransition } from 'react'
import { deletePost } from '@/actions/posts'
import { Button } from '@/components/ui/Button'
import { Trash2 } from 'lucide-react'

export function DeleteButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm('Delete this post? This cannot be undone.')) return
    startTransition(async () => {
      await deletePost(id)
    })
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      loading={pending}
      id={`delete-post-${id}`}
    >
      <Trash2 size={14} />
      Delete
    </Button>
  )
}
