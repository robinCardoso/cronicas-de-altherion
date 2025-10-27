'use client'

import React from 'react'
import { Character } from '@/types/game'
import TutorialInterface from './TutorialInterface'

interface StoryInitializerProps {
  character: Character
  onStoryComplete: (character: Character) => void
}

export function StoryInitializer({ character, onStoryComplete }: StoryInitializerProps) {
  return (
    <TutorialInterface 
      character={character} 
      onTutorialComplete={onStoryComplete}
    />
  )
}
