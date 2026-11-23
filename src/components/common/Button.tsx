import type { ReactNode, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'pink'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[#7D2D76] hover:bg-[#61316B] text-white shadow-sm hover:shadow-md',
  secondary:
    'bg-[#56344F] hover:bg-[#46394A] text-white shadow-sm hover:shadow-md',
  outline:
    'border-2 border-[#7D2D76] text-[#7D2D76] hover:bg-[#7D2D76] hover:text-white',
  ghost:
    'text-[#7D2D76] hover:bg-purple-50',
  gold:
    'bg-[#D2AE34] hover:bg-[#c09d2a] text-white shadow-sm hover:shadow-md',
  pink:
    'bg-[#EE6B8B] hover:bg-[#e05070] text-white shadow-sm hover:shadow-md',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-full',
  md: 'px-6 py-2.5 text-sm rounded-full',
  lg: 'px-8 py-3.5 text-base rounded-full',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
