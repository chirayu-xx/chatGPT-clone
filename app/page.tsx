import React from 'react'
import {BoltIcon, ExclamationTriangleIcon, SunIcon} from '@heroicons/react/24/outline'

function Home() {
  return (
    <div className='text-white flex flex-col items-center justify-center min-h-screen px-2'>
     <h1 className='text-5xl font-bold mb-20'>Ultimate ChatGPT Clone</h1>
     <div className='flex space-x-2 text-center'>
        <div>
            <div className='flex flex-col items-center justify-center mb-5'>
                <SunIcon className='h-8 w-8'/>
                <h2>Examples</h2>
            </div>
            <div className='space-y-2'>
                <p className='infoText'>&ldquo;Explain Something to me&ldquo;</p>
                <p className='infoText'>&ldquo;What is the difference between dog and cat&ldquo;</p>
                <p className='infoText'>&ldquo;What is the color of the sun?&ldquo;</p>
            </div>
        </div>
        <div>
            <div className='flex flex-col items-center justify-center mb-5'>
                <BoltIcon className='h-8 w-8'/>
                <h2>Capabilities</h2>
            </div>
            <div className='space-y-2'>
                <p className='infoText'>&ldquo;Change the ChatGPT model to use</p>
                <p className='infoText'>&ldquo;Messages are stored are in Firebase&apos;s Firestore&ldquo;</p>
                <p className='infoText'>&ldquo;Hot toast notification when ChatGPT is generating&ldquo;</p>
            </div>
        </div>
        <div>
            <div className='flex flex-col items-center justify-center mb-5'>
                <ExclamationTriangleIcon className='h-8 w-8'/>
                <h2>Limitations</h2>
            </div>
            <div className='space-y-2'>
                <p className='infoText'>&ldquo;May occasionally produce harmful instructions or biased content&ldquo;</p>
                <p className='infoText'>&ldquo;What is the difference between dog and cat&ldquo;</p>
                <p className='infoText'>&ldquo;Limited knowledge of world and events after 2021&ldquo;</p>
            </div>
        </div>
     </div>
    </div>
  )
}

export default Home
