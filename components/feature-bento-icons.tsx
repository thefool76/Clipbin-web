"use client";

import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Zap } from "@/components/animate-ui/icons/zap";
import { LockKeyholeOpen } from "@/components/animate-ui/icons/lock-keyhole-open";
import { Layers } from "@/components/animate-ui/icons/layers";
import { Eye } from "@/components/animate-ui/icons/eye";
import { Clock11 } from "@/components/animate-ui/icons/clock-11";

const BENTO_ICONS = [
  Zap,           // 0: Simple And Fast
  LockKeyholeOpen, // 1: Private By Default
  Layers,        // 2: Speaks Your Workflow
  Eye,           // 3: View Tracking
  Clock11,       // 4: Auto Expiry
] as const;

type Size = "default" | "large" | "hero";

export function FeatureBentoIcon({ index, size = "default" }: { index: number; size?: Size }) {
  if (index === 0) return null;

  const Icon = BENTO_ICONS[Math.min(index, BENTO_ICONS.length - 1)];
  const iconSize =
    size === "hero" ? 80 : size === "large" ? 40 : 22;

  const wrapClass =
    size === "hero"
      ? "feature-icon-wrap feature-icon-wrap-hero"
      : size === "large"
        ? "feature-icon-wrap feature-icon-wrap-large"
        : "feature-icon-wrap";

  return (
    <span className={wrapClass} aria-hidden>
      <AnimateIcon animateOnHover>
        <Icon size={iconSize} />
      </AnimateIcon>
    </span>
  );
}
