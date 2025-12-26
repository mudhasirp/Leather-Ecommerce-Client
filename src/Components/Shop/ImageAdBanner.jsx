export default function BannerWithBg() {
  return (
    <>
      
      {/* Left Image */}
   

     <div className="flex flex-col md:flex-row w-full gap-5 px-6 mt-3" >
         <div className="h-[150px] md:h-[300px] w-full rounded-3xl bg-cover   transition-transform duration-500 hover:scale-105" style={{ 'backgroundImage': "url('/11.png')", "backgroundSize":'cover' }}>
        
         </div>
         <div className="h-[150px] md:h-[300px] w-full rounded-3xl bg-cover  transition-transform duration-500 hover:scale-105" style={{ 'backgroundImage': "url('/10.png')", "backgroundSize":'cover' }}></div>
     </div>

</>
  );
}
