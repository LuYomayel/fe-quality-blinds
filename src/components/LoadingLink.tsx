"use client";

import Link from "next/link";
import { useLoading } from "./LoadingProvider";
import { useRouter } from "next/navigation";
import React from "react";

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function LoadingLink({
  href,
  children,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: LoadingLinkProps) {
  const { setIsLoading } = useLoading();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    // Don't trigger loading for anchor links or external links
    if (
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      onClick?.();
      return;
    }

    // Don't trigger loading if it's the same page
    if (href === window.location.pathname) {
      onClick?.();
      return;
    }

    e.preventDefault();
    setIsLoading(true);
    onClick?.();

    // Use setTimeout to ensure loading shows before navigation
    setTimeout(() => {
      router.push(href);
    }, 100);
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  );
}
