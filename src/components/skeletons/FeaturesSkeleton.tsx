import { memo } from "react";

function FeaturesSkeleton() {
  return (
    <div className="relative overflow-hidden bg-[#FFFFFF] border-y border-[#EAEAEA]/60 pt-[35px] pb-[70px]">
      <div className="max-w-7xl mx-auto section-container-padding relative z-10">
        
        {/* Section Header Skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="w-32 h-7 bg-[#EAEAEA]/60 rounded-full mx-auto animate-pulse" />
          <div className="w-3/4 sm:w-1/2 h-10 bg-[#EAEAEA]/60 rounded-lg mx-auto mt-5 animate-pulse" />
          <div className="w-5/6 sm:w-2/3 h-5 bg-[#EAEAEA]/60 rounded-md mx-auto mt-4 animate-pulse" />
        </div>

        {/* Features Bento Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[15px]">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[15px] bg-[#FFFFFF] border border-[#EAEAEA]/50 shadow-md flex flex-col"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#FA5903]/5 animate-pulse" />
                <div className="w-16 h-5 bg-[#EAEAEA]/60 rounded-full animate-pulse" />
              </div>

              <div className="w-2/3 h-5 bg-[#EAEAEA]/60 rounded-md mb-3 animate-pulse" />
              <div className="w-full h-4 bg-[#EAEAEA]/60 rounded-md mb-2 animate-pulse" />
              <div className="w-4/5 h-4 bg-[#EAEAEA]/60 rounded-md animate-pulse" />
            </div>
          ))}
        </div>

        {/* Bottom Banner Skeleton */}
        <div className="mt-16 p-8 sm:p-12 rounded-[15px] bg-[#FFFFFF] border border-[#EAEAEA]/60 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-[30px]">
          <div className="max-w-xl text-left w-full">
            <div className="w-2/3 h-7 bg-[#EAEAEA]/60 rounded-md mb-3 animate-pulse" />
            <div className="w-full h-4 bg-[#EAEAEA]/60 rounded-md mb-2 animate-pulse" />
            <div className="w-5/6 h-4 bg-[#EAEAEA]/60 rounded-md animate-pulse" />
          </div>
          <div className="flex items-center gap-[15px] shrink-0 flex-wrap w-full lg:w-auto justify-start lg:justify-end">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#FFFFFF] border border-[#EAEAEA]/60 p-4 rounded-[15px] text-center w-28 sm:w-32 h-20 flex flex-col justify-center items-center gap-2"
              >
                <div className="w-14 h-5 bg-[#FA5903]/10 rounded-md animate-pulse" />
                <div className="w-16 h-3 bg-[#EAEAEA]/60 rounded-md animate-pulse" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default memo(FeaturesSkeleton);
