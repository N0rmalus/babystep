import { Billboard as BillboardType } from "@/types";
import {Bird} from 'lucide-react';

interface BillboardProps {
    data: BillboardType
}

const Billboard: React.FC<BillboardProps> = ({
    data
}) => {
    return (
        <div className="rounded-xl overflow-hidden">
            <div style={{ backgroundImage: `url(${data.imageUrl})`, backgroundPosition: 'center' }} className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
                <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                    <div className="font-bold opacity-70 text-3xl sm:text-5xl lg:text-7xl sm:max-w-xl max-w-xs">
                        {data.label || <Bird className="w-56 h-56" />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Billboard;