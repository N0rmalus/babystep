import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { TrashIcon, X } from 'lucide-react';

import IconButton from '@/components/ui/icon-button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
import { Product } from '@/actions/types';

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex py-6">
      <div className="relative h-24 w-24 overflow-hidden rounded-md sm:h-48 sm:w-48">
        <Image fill src={data.images[0].url} alt="" className="object-cover object-center" />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute right-0 top-0 z-10">
          <IconButton onClick={onRemove} icon={<TrashIcon size={15} />} />
        </div>
        <div className="flex flex-col">
          <p className="text-lg text-black"> {data.name} </p>
          <Currency value={data.price} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
