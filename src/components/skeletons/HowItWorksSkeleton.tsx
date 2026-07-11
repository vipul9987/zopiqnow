import { memo } from "react";

function HowItWorksSkeleton() {
  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] pt-[35px] pb-[35px] border-b border-[#EAEAEA]/60">
      {/* Decorative Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#EAEAEA_1px,transparent_1px)] [background-size:24px_24px] opacity-4 pointer-events-none" />

      <div className="max-w-7xl mx-auto section-container-padding relative z-10">
        
        {/* Section Heading Skeleton */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="w-36 h-7 bg-[#EAEAEA]/60 rounded-full mx-auto animate-pulse" />
          <div className="w-2/3 sm:w-1/2 h-10 bg-[#EAEAEA]/60 rounded-lg mx-auto mt-4 animate-pulse" />
          <div className="w-5/6 h-5 bg-[#EAEAEA]/60 rounded-md mx-auto mt-3 animate-pulse" />
        </div>

        {/* Desktop Alternating Wavy Layout Skeleton */}
        <div className="hidden md:block relative w-full h-[400px] mt-12 mb-8">
          {/* Wave SVG Line Background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1000 400"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 200 C 60 200, 65 320, 125 320 C 185 320, 315 80, 375 80 C 435 80, 565 320, 625 320"
              fill="none"
              stroke="#EAEAEA"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="opacity-90"
            />
            <path
              d="M 625 320 C 685 320, 815 80, 875 80 C 935 80, 940 200, 1000 200"
              fill="none"
              stroke="#EAEAEA"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="8 8"
              className="opacity-90"
            />
          </svg>

          {/* Steps Grid */}
          <div className="grid grid-cols-4 h-full relative z-10">
            {Array.from({ length: 4 }).map((_, idx) => {
              const isEven = idx % 2 === 1;

              return (
                <div key={idx} className="flex flex-col justify-between h-full px-4">
                  {/* Top Segment */}
                  <div className="h-[140px] flex flex-col justify-end">
                    {!isEven ? (
                      <div className="text-left w-full">
                        <div className="w-10 h-10 bg-[#FA5903]/5 rounded-md mb-2 animate-pulse" />
                        <div className="w-2/3 h-5 bg-[#EAEAEA]/60 rounded-md mb-2 animate-pulse" />
                        <div className="w-5/6 h-3 bg-[#EAEAEA]/60 rounded-md animate-pulse" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="w-20 h-20 rounded-3xl bg-white border border-[#EAEAEA]/80 flex items-center justify-center shadow-md animate-pulse">
                          <div className="w-10 h-10 rounded-xl bg-[#FA5903]/5" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Middle spacer */}
                  <div className="h-[120px]" />

                  {/* Bottom Segment */}
                  <div className="h-[140px] flex flex-col justify-start">
                    {isEven ? (
                      <div className="text-left w-full">
                        <div className="w-10 h-10 bg-[#FA5903]/5 rounded-md mb-2 animate-pulse" />
                        <div className="w-2/3 h-5 bg-[#EAEAEA]/60 rounded-md mb-2 animate-pulse" />
                        <div className="w-5/6 h-3 bg-[#EAEAEA]/60 rounded-md animate-pulse" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="w-20 h-20 rounded-3xl bg-white border border-[#EAEAEA]/80 flex items-center justify-center shadow-md animate-pulse">
                          <div className="w-10 h-10 rounded-xl bg-[#FA5903]/5" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Layout Skeleton */}
        <div className="md:hidden space-y-12 mt-12 relative">
          <div className="absolute top-10 bottom-10 left-[40px] w-[2px] bg-[#EAEAEA] pointer-events-none z-0" />

          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex items-start gap-6 relative z-10">
              <div className="flex-shrink-0 w-20 h-20 rounded-3xl bg-white border border-[#EAEAEA]/80 flex items-center justify-center shadow-md animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-[#FA5903]/5" />
              </div>
              <div className="pt-2 text-left flex-1">
                <div className="w-8 h-8 bg-[#FA5903]/5 rounded-md mb-2 animate-pulse" />
                <div className="w-1/2 h-5 bg-[#EAEAEA]/60 rounded-md mb-2 animate-pulse" />
                <div className="w-5/6 h-4 bg-[#EAEAEA]/60 rounded-md animate-pulse" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default memo(HowItWorksSkeleton);
