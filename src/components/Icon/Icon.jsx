import React from 'react';
import iconsUrl from '../../assets/icons/icons.svg';

const Icon = ({
  name,
  className = '',
  color,
  size,
  ariaLabel,
  isInteractive = false,
  onClick,
  testId,
  ...props
}) => {
  const hasAriaLabel = ariaLabel !== null && ariaLabel !== undefined;
  
  return (
    <svg
      className={`icon icon-${name} ${className} ${isInteractive ? 'icon-interactive' : ''} hidden`}
      style={{
        width: size || '1.5rem',
        height: size || '1.6rem',
        color: color || 'currentColor',
      }}
      aria-hidden={!hasAriaLabel}
      aria-label={hasAriaLabel ? ariaLabel : undefined}
      role={hasAriaLabel ? 'img' : undefined}
      onClick={onClick}
      data-testid={testId}
      {...props}
    >
      <use href={`${iconsUrl}#${name}`} />
    </svg>
  );
};

export default Icon;