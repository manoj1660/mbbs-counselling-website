import { HeroVideoDialog } from "./ui/hero-video-dialog"

export function HeroVideoDialogDemoTopInBottomOut() {
  return (
    <div className="relative">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/TyW9HVcG2sI?autoplay=1&playsinline=1&rel=0"
        thumbnailSrc="/images/hero-video.png"
        thumbnailAlt="Hero Video"
      />

      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/TyW9HVcG2sI?autoplay=1&playsinline=1&rel=0"
        thumbnailSrc="/images/hero-video.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  )
}