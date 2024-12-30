"use client"

import React, { useState } from "react"
import { Minus, Plus } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function NumberInput(props: { value: number, setValue: (value: number) => void }) {
  const { value, setValue } = props


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10)
    if (!isNaN(newValue)) {
      setValue(Math.max(0, newValue))
    }
  }

  return (
      <div className="relative inline-flex h-9 w-full items-center overflow-hidden rounded-lg border border-input shadow-sm transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20">
        <Input
          id="number-input"
          type="number"
          value={value}
          onChange={handleInputChange}
          className="h-full w-full border-none text-center focus-visible:ring-0 focus-visible:ring-offset-0"
        />
  )
}

