import { HeroVideoDialog } from "./ui/hero-video-dialog"

export function HeroVideoDialogDemoTopInBottomOut() {
  return (
    <div className="relative">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/-fREY9S7ze0"
        thumbnailSrc="/images/hero-video.png"
        thumbnailAlt="Hero Video"
      />

      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/-fREY9S7ze0"
        thumbnailSrc="/images/hero-video.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  )
}