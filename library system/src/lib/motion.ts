import { useReducedMotion, type Transition } from 'framer-motion'

const easeOut = [0.22, 1, 0.36, 1] as const

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
