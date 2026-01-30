import React from 'react';
type PatternType = 'zigzag' | 'diamond' | 'triangle';
interface ImigongoPatternProps {
  type: PatternType;
  className?: string;
  color?: 'terracotta' | 'sage' | 'golden' | 'text';
}
export function ImigongoPattern({
  type,
  className = '',
  color = 'terracotta'
}: ImigongoPatternProps) {
  const getColor = () => {
    switch (color) {
      case 'terracotta':
        return '#D4745E';
      case 'sage':
        return '#6B8E6F';
      case 'golden':
        return '#E8B44F';
      case 'text':
        return '#2D2D2D';
      default:
        return '#D4745E';
    }
  };
  const fill = getColor();
  if (type === 'zigzag') {
    return <svg className={className} viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 20L10 10L20 20L30 10L40 20L50 10L60 20L70 10L80 20L90 10L100 20V10L90 0L80 10L70 0L60 10L50 0L40 10L30 0L20 10L10 0L0 10V20Z" fill={fill} opacity="0.8" />
      </svg>;
  }
  if (type === 'diamond') {
    return <svg className={className} viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10L20 0L30 10L20 20L10 10ZM40 10L50 0L60 10L50 20L40 10ZM70 10L80 0L90 10L80 20L70 10Z" fill={fill} opacity="0.8" />
      </svg>;
  }
  // Triangle
  return <svg className={className} viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 20H20L10 0L0 20ZM30 20H50L40 0L30 20ZM60 20H80L70 0L60 20Z" fill={fill} opacity="0.8" />
    </svg>;
}