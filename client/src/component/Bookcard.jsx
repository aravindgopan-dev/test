import React from 'react';


function Bookcard() {
    return (
        <div className='bg-yellow-300 border-blue-900 border-2 w-[210px] flex flex-col items-center p-4 rounded-lg shadow-md  mx-auto mb-6'>
            <div className='w-[200px] mb-4'>
                <img 
                    src="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781785570766/bedtime-stories-for-girls-9781785570766_lg.jpg" 
                    alt="Bedtime Stories for Girls" 
                    className='rounded-lg' 
                />
            </div>
            <div className='text-center text-blue-800 font-semibold text-lg mb-2'>
                Bedtime Stories for Girls
            </div>
       
            <div>
                <button className='bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition duration-200'>
                    Read Me
                </button>
            </div>
        </div>
    );
}

export default Bookcard;
