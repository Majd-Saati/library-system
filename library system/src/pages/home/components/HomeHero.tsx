import { ArrowDown, Books } from '@phosphor-icons/react'
import {
  motion,
  useScroll,
  useTransform,
  type PanInfo,
} from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { scrollToElement, useMotionPrefs } from '../../../lib/motion'
import { paths } from '../../../routes/paths'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2400&q=80'

const SWIPE_OFFSET = -72
const SWIPE_VELOCITY = -450
const WHEEL_DELTA = 8

interface HomeHeroProps {
  catalogId?: string
}

export function HomeHero({ catalogId = 'catalog' }: HomeHeroProps) {
  const { t } = useTranslation()
  const heroRef = useRef<HTMLElement | null>(null)
  const navigatingRef = useRef(false)
  const { fadeUp, fadeUpTransition, prefersReducedMotion } = useMotionPrefs()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '28%'],
  )
  const imageScaleScroll = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1.12, 1.12] : [1.12, 1.22],
  )
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '14%'],
  )
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.9],
    prefersReducedMotion ? [1, 1, 1] : [1, 0.85, 0],
  )
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0.35, 0.35] : [0.25, 0.55],
  )

  const goToCatalog = useCallback(() => {
    if (navigatingRef.current) return
    navigatingRef.current = true
    scrollToElement(catalogId, { reducedMotion: Boolean(prefersReducedMotion) })
    window.setTimeout(() => {
      navigatingRef.current = false
    }, prefersReducedMotion ? 50 : 900)
  }, [catalogId, prefersReducedMotion])

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.y <= SWIPE_OFFSET || info.velocity.y <= SWIPE_VELOCITY) {
      goToCatalog()
    }
  }

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    function handleWheel(event: WheelEvent) {
      if (!hero || event.deltaY <= WHEEL_DELTA || navigatingRef.current) return
      if (window.scrollY > hero.offsetHeight * 0.35) return

      event.preventDefault()
      goToCatalog()
    }

    hero.addEventListener('wheel', handleWheel, { passive: false })
    return () => hero.removeEventListener('wheel', handleWheel)
  }, [goToCatalog])

  return (
    <motion.section
      ref={heroRef}
      className="relative isolate min-h-[min(88svh,52rem)] cursor-grab touch-pan-x overflow-hidden active:cursor-grabbing"
      aria-labelledby="home-hero-brand"
      drag={prefersReducedMotion ? false : 'y'}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.35, bottom: 0.08 }}
      onDragEnd={handleDragEnd}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <motion.img
          src={HERO_IMAGE}
          alt=""
          className="pointer-events-none absolute inset-x-0 top-[-8%] h-[116%] w-full object-cover object-[center_35%] will-change-transform"
          draggable={false}
          style={{ y: imageY, scale: imageScaleScroll }}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark/95 via-brand-dark/55 to-brand-dark/25 dark:from-page/95 dark:via-page/70 dark:to-page/35" />
        <div className="absolute inset-0 bg-linear-to-r from-brand-dark/70 via-transparent to-transparent dark:from-page/80" />
        <motion.div
          className="absolute inset-0 bg-brand-dark dark:bg-page"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex min-h-[min(88svh,52rem)] max-w-7xl flex-col justify-end px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24 lg:justify-center lg:px-8 lg:pb-24 lg:pt-28"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-xl lg:max-w-2xl">
          <motion.p
            id="home-hero-brand"
            className="font-display text-4xl leading-none tracking-tight text-white sm:text-5xl lg:text-6xl dark:text-ink"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0)}
          >
            {t('app.name')}
          </motion.p>

          <motion.h1
            className="mt-5 font-display text-2xl leading-snug text-white/95 sm:text-3xl lg:mt-6 lg:text-4xl dark:text-ink"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.12)}
          >
            {t('home.hero.headline')}
          </motion.h1>

          <motion.p
            className="mt-3 max-w-md text-base text-white/80 sm:text-lg dark:text-muted"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.22)}
          >
            {t('home.hero.subtitle')}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.32)}
            onPointerDownCapture={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={goToCatalog}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-page"
            >
              {t('home.hero.browseCta')}
              <ArrowDown size={16} weight="bold" aria-hidden />
            </button>
            <Link
              to={paths.shelf}
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/35 backdrop-blur-sm transition duration-300 hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-surface/40 dark:text-ink dark:ring-border dark:hover:bg-surface/70"
            >
              <Books size={16} weight="bold" aria-hidden />
              {t('home.hero.shelfCta')}
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        type="button"
        onClick={goToCatalog}
        className="absolute inset-x-0 bottom-4 z-10 mx-auto flex w-max flex-col items-center gap-1.5 text-white/75 transition hover:text-white dark:text-ink/70 dark:hover:text-ink"
        aria-label={t('home.hero.swipeHint')}
        style={{ opacity: contentOpacity }}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={fadeUpTransition(0.42)}
      >
        <span className="text-xs font-semibold tracking-wide">
          {t('home.hero.swipeHint')}
        </span>
        <motion.span
          aria-hidden
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, 6, 0], opacity: [0.55, 1, 0.55] }
          }
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="grid h-8 w-8 place-items-center rounded-full bg-white/10 ring-1 ring-white/25 dark:bg-surface/40 dark:ring-border"
        >
          <ArrowDown size={16} weight="bold" />
        </motion.span>
      </motion.button>

      <span className="sr-only">{t('home.hero.imageAlt')}</span>
    </motion.section>
  )
}
