import { animate, useReducedMotion, type Transition } from 'framer-motion'

const easeOut = [0.22, 1, 0.36, 1] as const

export function scrollToElement(
  elementId: string,
  options?: { offset?: number; duration?: number; reducedMotion?: boolean },
) {
  const element = document.getElementById(elementId)
  if (!element) return

  const offset = options?.offset ?? 96
  const reducedMotion = options?.reducedMotion ?? false
  const target =
    element.getBoundingClientRect().top + window.scrollY - offset

  if (reducedMotion) {
    window.scrollTo({ top: target, behavior: 'auto' })
    return
  }

  animate(window.scrollY, target, {
    duration: options?.duration ?? 0.85,
    ease: easeOut,
    onUpdate: (value) => window.scrollTo(0, value),
  })
}

export function useMotionPrefs() {
  const prefersReducedMotion = useReducedMotion()

  const fadeUp = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    visible: { opacity: 1, y: 0 },
  }

  const fadeUpTransition = (delay = 0): Transition => ({
    duration: prefersReducedMotion ? 0 : 0.7,
    delay: prefersReducedMotion ? 0 : delay,
    ease: easeOut,
  })

  const imageScale = {
    hidden: { scale: prefersReducedMotion ? 1 : 1.08 },
    visible: { scale: 1 },
  }

  const imageTransition: Transition = {
    duration: prefersReducedMotion ? 0 : 1.4,
    ease: easeOut,
  }

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
      },
    },
  }

  const staggerItem = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.45,
        ease: easeOut,
      },
    },
  }

  return {
    prefersReducedMotion,
    fadeUp,
    fadeUpTransition,
    imageScale,
    imageTransition,
    staggerContainer,
    staggerItem,
  }
}
