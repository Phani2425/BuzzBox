
import ChatList from "../Specific/ChatList"
import { Skeleton } from "@/components/ui/skeleton"

const Loaders = () => {
    
    const isMobileMenuOpen = false;

  return (
    <div className='relative min-h-screen overflow-hidden bg-black'>
                <div
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%231d4ed8' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />

                <div
                    className="pointer-events-none absolute left-1/2 bottom-0 w-[800px] h-[800px] -translate-x-1/2 translate-y-1/2 bg-[#1d4ed8] opacity-30 rounded-full"
                    style={{
                        filter: 'blur(100px)',
                        animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                />

                <div className='h-[calc(100vh-4rem)] px-4 py-6'>
                    <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr_1fr] gap-6 h-[calc(100%-2rem)] mt-8'>
                        {/* Left section */}
                        <Skeleton className={`hidden md:block glassmorphism rounded-2xl ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>

                            <ChatList chats={['1','2','3','4','5','6']}/>
                        </Skeleton>


                        <Skeleton className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden transition duration-200 ease-in-out z-40 w-64 bg-black/80 backdrop-blur-xl backdrop-saturate-150 overflow-y-auto`}>
                            <div className="p-6">

                                Mobile Menu Content
                            </div>
                        </Skeleton>


                        <Skeleton className='col-span-2 md:col-span-1 glassmorphism rounded-2xl'>
                            
                        </Skeleton>

                        <Skeleton className='hidden lg:block glassmorphism rounded-2xl'>

                            Right Section
                        </Skeleton>
                    </div>
                </div>

                <style jsx global>{`
                    @keyframes pulse {
                        0%, 100% {
                            opacity: 0.3;
                        }
                        50% {
                            opacity: 0.15;
                        }
                    }

                    .glassmorphism {
                        background: rgba(255, 255, 255, 0.05);
                        backdrop-filter: blur(10px) saturate(150%);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                    }
                `}</style>
            </div>
  )
}

export default Loaders