import React from "react";
import { Label } from "./ui/label";
import Image from "next/image";

const Card = ({ title, count, percentage,img }) => {
	return (
		<div className="flex flex-row gap-4 p-4 bg-white rounded-lg shadow-md  w-[328px] h-[151px] justify-between items-center">
			<div>
				<Label className="text-[16px] font-semibold text-[#656565]">
					{title}
				</Label>
				<h3 className="font-bold text-brandBlue text-[48px]">{count}</h3>
				<div>
					<p className="text-[14px] text-[#1DB763]">{percentage}</p>
				</div>
			</div>
			<div>
        <Image src={img} alt="logo" width={50} height={50} />
      </div>
		</div>
	);
};

export default Card;
