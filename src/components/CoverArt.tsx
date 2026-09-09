interface Props {
  seed: string // 用于稳定生成配色的种子（一般用条目 id）
  title: string
  image?: string
  className?: string
}

/** 基于种子从调色板中稳定取色 */
const palette = [
  'bg-accent-soft text-accent-strong',
  'bg-warm-soft text-warm',
  'bg-sage/15 text-sage',
  'bg-rose/15 text-rose',
]

/**
 * 封面组件：有 image 时用图片（懒加载），
 * 否则生成一个「首字 + 柔和配色」的本地占位封面，不依赖外部图床。
 */
export default function CoverArt({ seed, title, image, className = '' }: Props) {
  if (image) {
    return (
      <img
        src={image}
        alt={`${title} 封面`}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  const tone = palette[hash % palette.length]
  const initial = title.replace(/^示例[：:]/, '').trim().charAt(0) || '·'

  return (
    <div
      aria-hidden="true"
      className={`flex h-full w-full select-none items-center justify-center ${tone} ${className}`}
    >
      <span className="text-4xl font-bold opacity-70">{initial}</span>
    </div>
  )
}
