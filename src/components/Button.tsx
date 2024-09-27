interface ButtonProps {
  label: string;
  onClick?: any;
  className?: string;
  type?: any
}
const Button = ({ label, className, type, onClick }: ButtonProps) => {
  return (
    <div className='flex md:justify-center mt-6'>
      <button
        type={type ? type : "button"}
        onClick={onClick}
        className={`rounded-md bg-[#28698C] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#28698C] ${className}`}
      >
        {label}
      </button>
    </div>

  )
}

export default Button