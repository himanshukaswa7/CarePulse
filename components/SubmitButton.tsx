import { Button } from './ui/button'
import Image from 'next/image'

interface ButtonProps {
    isloading: boolean;
    className?: string;
    children: React.ReactNode;
}

const SubmitButton = ({isloading, className, children}: ButtonProps) => {
  return (
    <Button 
    type='submit'
    disabled={isloading} 
    className={className ?? 'shad-primary-btn w-full'}>
     {isloading ? (
        <div className='flex items-center gap-4'>
            <Image 
            src="/assets/icons/loader.svg"
            alt='Loader'
            height={24}
            width={24}
            className='animate-spin'
            />
            Loading...
        </div>
     ): children}
    </Button>
  )
}

export default SubmitButton