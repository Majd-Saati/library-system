import { ArrowDown, Books } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { paths } from '../../../routes/paths'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2400&q=80'

interface HomeHeroProps {
  catalogId?: string
}

export function HomeHero({ catalogId = 'catalog' }: HomeHeroProps) {
  const { t } = useTranslation()

  return (
    <section
      className="home-hero relative isolate min-h-[min(88svh,52rem)] overflow-hidden"
      aria-labelledby="home-hero-brand"
    >
      <div className="absolute inset-0" aria-hidden>
        <img
          src={HERO_IMAGE}
          alt=""
          className="home-hero__image h-full w-full object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark/95 via-brand-dark/55 to-brand-dark/25 dark:from-page/95 dark:via-page/70 dark:to-page/35" />
        <div className="absolute inset-0 bg-linear-to-r from-brand-dark/70 via-transparent to-transparent dark:from-page/80" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(88svh,52rem)] max-w-7xl flex-col justify-end px-4 pb-14 pt-20 sm:px-6 sm:pb-16 sm:pt-24 lg:justify-center lg:px-8 lg:pb-24 lg:pt-28">
        <div className="max-w-xl lg:max-w-2xl">
          <p
            id="home-hero-brand"
            className="home-hero__brand font-display text-4xl leading-none tracking-tight text-white sm:text-5xl lg:text-6xl dark:text-ink"
          >
            {t('app.name')}
          </p>

          <h1 className="home-hero__headline mt-5 font-display text-2xl leading-snug text-white/95 sm:text-3xl lg:mt-6 lg:text-4xl dark:text-ink">
            {t('home.hero.headline')}
          </h1>

          <p className="home-hero__subtitle mt-3 max-w-md text-base text-white/80 sm:text-lg dark:text-muted">
            {t('home.hero.subtitle')}
          </p>

          <div className="home-hero__actions mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`#${catalogId}`}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-page"
            >
              {t('home.hero.browseCta')}
              <ArrowDown size={16} weight="bold" aria-hidden />
            </a>
            <Link
              to={paths.shelf}
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/35 backdrop-blur-sm transition duration-300 hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-surface/40 dark:text-ink dark:ring-border dark:hover:bg-surface/70"
            >
              <Books size={16} weight="bold" aria-hidden />
              {t('home.hero.shelfCta')}
            </Link>
          </div>
        </div>
      </div>

      <span className="sr-only">{t('home.hero.imageAlt')}</span>
    </section>
  )
}
