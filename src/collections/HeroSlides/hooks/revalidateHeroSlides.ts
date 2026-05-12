import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateHeroSlides: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating homepage — hero slide changed')
    revalidateTag('hero-slides', 'max')
    revalidatePath('/')
    revalidatePath('/en')
    revalidatePath('/zh')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag('hero-slides', 'max')
    revalidatePath('/')
    revalidatePath('/en')
    revalidatePath('/zh')
  }
  return doc
}
