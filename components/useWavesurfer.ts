import { useState, useEffect, RefObject } from "react"
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js"

export const useWavesurfer = (containerRef: RefObject<HTMLElement>, options: Omit<WaveSurferOptions, 'container'>) => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer>()

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return
    const ws = WaveSurfer.create({
      ...options,
      autoplay: true,
      container: containerRef.current,
    })

    console.log('create')
    setWavesurfer(ws)

    return () => {
      console.log('destroy')
      ws.destroy()
    }
  }, [options, containerRef])

  return wavesurfer
}
