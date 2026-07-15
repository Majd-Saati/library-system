import { BookOpen, MagnifyingGlass } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useMotionPrefs } from '../../lib/motion'
import { paths } from '../../routes/paths'

export function NotFoundPage() {
  const { t } = useTranslation()
  const { fadeUp, fadeUpTransition } = useMotionPrefs()

  return (
    <section className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <motion.p
        className="font-display text-[7rem] leading-none tracking-tight text-brand/15 sm:text-[9rem]"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={fadeUpTransition(0)}
        aria-hidden
      >
        404
      </motion.p>

      <motion.div
        className="-mt-8 sm:-mt-10"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={fadeUpTransition(0.08)}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
          {t('notFound.eyebrow')}
        </p>
        <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
          {t('notFound.title')}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          {t('notFound.subtitle')}
        </p>
      </motion.div>

      <motion.div
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={fadeUpTransition(0.16)}
      >
        <Link
          to={paths.home}
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark dark:text-page"
        >
          <BookOpen size={16} weight="bold" aria-hidden />
          {t('notFound.backHome')}
        </Link>
        <Link
          to={`${paths.home}#catalog`}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-light px-4 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand-light/80"
        >
          <MagnifyingGlass size={16} weight="bold" aria-hidden />
          {t('notFound.browseCatalog')}
        </Link>
      </motion.div>
    </section>
  )
}
