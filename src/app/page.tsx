import React from 'react'
import Copyright from './Components/Copyright/Copyright'

const RootPage = () => {
  return (
    <div className='root-page flex flex-col md:flex-row gap-y-16 md:gap-y-0 md:gap-x-[20rem]'>
      
      <div className='text-center md:text-start'>
        <h1 className="text-5xl md:text-8xl font-bold cursor-pointer text-gradient">Eventy</h1>
        <h2 className="text-3xl md:text-4xl font-bold cursor-pointer text-gradient">Seu evento começa aqui.</h2>

        
        <button className='button-gradient-reverse text-md rounded-md mt-4'>
          <a href='/signin' className='px-8 py-2 font-bold'>Entrar</a>
        </button>
      </div>
      

      <img src='home-image.png'
        className='h-[20rem] w-[20rem] md:h-[30rem] md:w-[30rem] slide-top' />

      <div className='absolute bottom-1 w-full items-center'>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </div>

    </div>
  )
}

export default RootPage
