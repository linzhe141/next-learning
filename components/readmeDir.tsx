'use client'
import { useReadme } from '@/hooks/useReadme'
type Props = {
  url: string
}
export default function ReadmeDir({ url }: Props) {
  const { dirStructure } = useReadme({ url })
  return (
    <div>
      {dirStructure.map((item) => (
        <div key={item}>
          <a href={`#${item}`}>{item}</a>
        </div>
      ))}
    </div>
  )
}
