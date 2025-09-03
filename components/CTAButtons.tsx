"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // delay between buttons
      delayChildren: 0.5,    // start delay
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function CTAButtons() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
    >
      <motion.div variants={itemVariants}>
        <div className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5">
          <Button asChild size="lg" className="rounded-xl px-5 text-base">
            <Link href="#link">
              <span className="text-nowrap">Start Building</span>
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button
          asChild
          size="lg"
          variant="ghost"
          className="h-10.5 rounded-xl px-5"
        >
          <Link href="#link">
            <span className="text-nowrap">Request a demo</span>
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  )
}
